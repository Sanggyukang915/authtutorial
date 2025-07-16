"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import { ChevronDown, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerTitle,
    DrawerHeader,
    DrawerFooter,
    DrawerClose,
} from "@/components/ui/drawer"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { DataTableColumnHeader } from "./data-table-header"
import { DataTablePagination } from "./data-table-pagination"
import { useMobile } from "@/hooks/use-mobile"
import Link from "next/link"
import { Separator } from "./ui/separator"
import { views } from "@/data/view"

type PublicDocument = {
    id: string;
    name: string;
    createdAt: Date;
    user: { name: string | null };
    _count: {
        likes: number;
    }
    views: number;
    content: { content: string }[];
};

export const columns: ColumnDef<PublicDocument>[] = [
    {
        id: "title",
        accessorFn: row => row.name,
        header: "Title",
        cell: ({ row }) => {
            return <TableCellViewer item={row.original} />
        },
    },
    {
        id: "author",
        accessorFn: row => row.user.name,
        header: "Author",
        cell: ({ row }) => {
            const user = row.getValue("author") as string
            return <div className="capitalize">{user}</div>
        },
    },
    {
        id: "views",
        accessorFn: row => row.views,
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Views" />
        ),
        cell: ({ row }) => {
            const view = row.getValue("views") as number;
            return <div className="font-medium">{view}</div>
        },
    },
    {
        id: "likes",
        accessorFn: row => row._count.likes,
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Likes" />
        ),
        cell: ({ row }) => {
            const likes = row.getValue("likes") as number;
            return (
                <div className="relative w-fit inline-block">
                    <Heart
                        className={`w-6 h-6 ${likes ? "stroke-pink-400" : "stroke-gray-400"}`}
                    />
                    <span
                        className="absolute -top-1 -right-1 text-[10px] font-semibold text-pink-600"
                    >
                        {likes}
                    </span>
                </div>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created At" />
        ),
        cell: ({ row }) => {
            const date = row.getValue("createdAt") as Date;
            return <div className="font-medium">{
                new Date(date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                })
            }</div>
        },
    },
    {
        id: "content",
        accessorFn: row => row.content?.[0]?.content ?? "",
        header: "Preview",
        cell: ({ row }) => {
            const preview = row.getValue("content") as string;
            return <div className="text-sm text-muted-foreground">{preview.slice(0, 100).replace(/<[^>]*>/g, "")}</div>
        },
    },
]

export function DocumentTable({ doc }: { doc: PublicDocument[] }) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data: doc,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full flex-col justify-start gap-6">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter title..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="relative flex flex-col gap-4 overflow-auto">
                <div className="overflow-hidden rounded-md border">
                    <Table>
                        <TableHeader className="bg-muted sticky top-0 z-10">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <DataTablePagination table={table} />
            </div>
        </div>
    )
}

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--primary)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--primary)",
    },
} satisfies ChartConfig

interface Viewers {
    date: string;
    mobile: number;
    desktop: number;
}

function TableCellViewer({ item }: { item: PublicDocument }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [hasFetched, setHasFetched] = React.useState(false);
    const [viewers, setViewers] = React.useState<Viewers[]>();
    const isMobile = useMobile()

    const fetchViewers = async () => {
        const data = await views(item.id, 90);
        setViewers(data);
    };

    return (
        <Drawer
            open={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open);
                if (open && !hasFetched) {
                    fetchViewers();
                    setHasFetched(true);
                }
            }}
            direction={isMobile ? "bottom" : "right"}>
            <DrawerTrigger asChild>
                <Button variant="link" className="text-foreground w-fit px-0 text-left">
                    {item.name}
                </Button>
            </DrawerTrigger>
            <DrawerContent className="gap-1">
                <DrawerHeader className="gap-1">
                    <Link href={`/doc/${item.id}`}>
                        <Button variant="link" className="text-foreground w-fit px-0 text-left">
                            <DrawerTitle>
                                {item.name}
                            </DrawerTitle>
                        </Button>
                    </Link>
                </DrawerHeader>
                <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
                    {!isMobile && (
                        <>
                            <ChartContainer config={chartConfig}>
                                <AreaChart
                                    accessibilityLayer
                                    data={viewers}
                                    margin={{
                                        left: 0,
                                        right: 10,
                                    }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                        hide
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="dot" />}
                                    />
                                    <Area
                                        dataKey="mobile"
                                        type="natural"
                                        fill="var(--color-mobile)"
                                        fillOpacity={0.6}
                                        stroke="var(--color-mobile)"
                                        stackId="a"
                                    />
                                    <Area
                                        dataKey="desktop"
                                        type="natural"
                                        fill="var(--color-desktop)"
                                        fillOpacity={0.4}
                                        stroke="var(--color-desktop)"
                                        stackId="a"
                                    />
                                </AreaChart>
                            </ChartContainer>
                            <Separator />
                            <div className="grid gap-2">
                                <div className="text-muted-foreground">
                                    Showing total visitors for the last 6 months.
                                </div>
                            </div>
                            <Separator />
                        </>
                    )}
                    <div className="flex gap-3">
                        <div>Title</div>
                        <div>{item.name}</div>
                    </div>
                    <div className="flex gap-3">
                        <div>Author</div>
                        <div>{item.user.name}</div>
                    </div>
                    <div className="flex gap-3">
                        <div>Created At</div>
                        <div>{new Date(item.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })
                        }</div>
                    </div>
                    <div className="flex gap-3">
                        <div>Liked</div>
                        <div className="relative w-fit inline-block">
                            <Heart
                                className={`w-6 h-6 ${item._count.likes ? "stroke-pink-400" : "stroke-gray-400"}`}
                            />
                            <span
                                className="absolute -top-1 -right-1 text-[10px] font-semibold text-pink-600"
                            >
                                {item._count.likes}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div>Content Preview</div>
                        <div>{item.content[0]?.content.slice(0, 500).replace(/<[^>]*>/g, "")}...</div>
                    </div>
                </div>
                <DrawerFooter>
                    <Button asChild className="w-full" variant="outline">
                        <Link href={`/doc/${item.id}`}>More</Link>
                    </Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}