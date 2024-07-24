import { CarIcon, DollarSignIcon } from "lucide-react";

import { Area, AreaChart, CartesianGrid, XAxis,Bar, BarChart, LabelList, YAxis } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

import { TrendingUp } from "lucide-react"




import { Progress } from "@/components/ui/progress";

const Overview = () => {
	return (
		<div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
			<div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4'>
				{/* <Card className='sm:col-span-2' x-chunk='dashboard-05-chunk-0'>
					<CardHeader className='pb-3'>
						<CardTitle>Your Orders</CardTitle>
						<CardDescription className='max-w-lg text-balance leading-relaxed'>
							Introducing Our Dynamic Orders Dashboard for Seamless Management
							and Insightful Analysis.
						</CardDescription>
					</CardHeader>
					<CardFooter>
						<Button>Create New Order</Button>
					</CardFooter>
				</Card> */}
				<Card x-chunk='dashboard-05-chunk-1'>
					<CardHeader className='pb-2'>
						<CardDescription>This Week</CardDescription>
						<CardTitle className='text-4xl'>$1,329</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-xs text-muted-foreground'>
							+25% from last week
						</div>
					</CardContent>
					<CardFooter>
						<Progress value={25} aria-label='25% increase' />
					</CardFooter>
				</Card>
				<Card x-chunk='dashboard-05-chunk-2'>
					<CardHeader className='pb-2'>
						<CardDescription>This Month</CardDescription>
						<CardTitle className='text-4xl'>$5,329</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-xs text-muted-foreground'>
							+10% from last month
						</div>
					</CardContent>
					<CardFooter>
						<Progress value={12} aria-label='12% increase' />
					</CardFooter>
				</Card>
			</div>

			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between pb-2'>
						<CardTitle className='text-sm font-medium'>
							Total Vehicles
						</CardTitle>
						<CarIcon className='w-4 h-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-4xl font-bold'>234</div>
						<p className='text-xs text-muted-foreground'>+5% from last month</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between pb-2'>
						<CardTitle className='text-sm font-medium'>
							Available Vehicles
						</CardTitle>
						<CarIcon className='w-4 h-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-4xl font-bold'>178</div>
						<p className='text-xs text-muted-foreground'>
							+10% from last month
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between pb-2'>
						<CardTitle className='text-sm font-medium'>Revenue</CardTitle>
						<DollarSignIcon className='w-4 h-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-4xl text-green-600 font-bold'>$45,231.89</div>
						<p className='text-xs text-muted-foreground'>
							+20.1% from last month
						</p>
					</CardContent>
				</Card>
			</div>
			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
				<Card>
					<CardHeader>
						<CardTitle>Rental Trends</CardTitle>
					</CardHeader>
					<CardContent>
						<LinechartChart className='aspect-[9/4]' />
					</CardContent>
					<CardFooter>
						<div className='flex w-full items-start gap-2 text-sm'>
							<div className='grid gap-2'>
								<div className='flex items-center gap-2 font-medium leading-none'>
									Trending up by 5.2% this month{" "}
									<TrendingUp className='h-4 w-4' />
								</div>
								<div className='flex items-center gap-2 leading-none text-muted-foreground'>
									January - June 2024
								</div>
							</div>
						</div>
					</CardFooter>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Customer Demographics</CardTitle>
						<CardDescription>January - June 2024</CardDescription>
					</CardHeader>
					<CardContent>
						<BarchartChart className='aspect-[9/4]' />
					</CardContent>
					<CardFooter className='flex-col items-start gap-2 text-sm'>
						<div className='flex gap-2 font-medium leading-none'>
							Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
						</div>
						<div className='leading-none text-muted-foreground'>
							Showing total customers for the last 6 months
						</div>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default Overview;

function LinechartChart(props: any) {
	return (
		<div {...props}>
			<ChartContainer
				config={{
					desktop: {
						label: "Desktop",
						color: "hsl(var(--chart-1))",
					},
				}}
			>
        <AreaChart
					accessibilityLayer
					data={[
						{ month: "January", rentals: 186 },
						{ month: "February", rentals: 305 },
						{ month: "March", rentals: 237 },
						{ month: "April", rentals: 73 },
						{ month: "May", rentals: 209 },
						{ month: "June", rentals: 214 },
					]}
					margin={{
						left: 12,
						right: 12,
					}}
				>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey='month'
						tickLine={false}
						axisLine={false}
						tickMargin={8}
						tickFormatter={(value) => value.slice(0, 3)}
					/>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent hideLabel />}
					/>
					<Area
						dataKey='rentals'
						type='natural'
						stroke='var(--color-desktop)'
						fillOpacity={0.4}
  
					/>
				</AreaChart>
			</ChartContainer>
      
		</div>
	);
}

//function barchart showing customer demographics



function BarchartChart(props: any) {
	return (
		<div {...props}>
			<ChartContainer
				config={{
          customer: {
            label: "customer",
            color: "hsl(210, 100%, 50%)",
          },
          label: {
            color: "hsl(var(--background))",
          },
        } satisfies ChartConfig}
			>
				<BarChart
					accessibilityLayer
					data={[
						{ month: "January", customers: 186 },
						{ month: "February", customers: 305 },
						{ month: "March", customers: 237 },
						{ month: "April", customers: 73 },
						{ month: "May", customers: 209 },
						{ month: "June", customers: 214 },
					]}
           layout="vertical"
					margin={{
						right: 16,
					}}
				>
					<CartesianGrid horizontal={false} />
					<YAxis
						  dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
					/>
          <XAxis dataKey="customers" type="number" hide />
          <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
					  <Bar
              dataKey="customers"
              layout="vertical"
              fill="#0074D9"
              radius={4}
            >
              <LabelList
                dataKey="month"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="customers"
                position="right"
                offset={8}
                className="fill-sky-500"
                fontSize={12}
              />
            </Bar>
				</BarChart>
			</ChartContainer>
		</div>
	);
}


