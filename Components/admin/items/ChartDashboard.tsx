import { Box, Stack, Typography } from '@mui/material';
import { LineChart, PieChart } from '@mui/x-charts';

const uData = [
    4000, 3000, 2000, 2780, 1890, 2390, 3490, 5000, 4002, 2201, 3333, 2323,
];
const pData = [
    2400, 1398, 9800, 3908, 4800, 3800, 4300, 2000, 2201, 4002, 3555, 4323,
];
const xLabels = [
    'Month 1',
    'Month 2',
    'Month 3',
    'Month 4',
    'Month 5',
    'Month 6',
    'Month 7',
    'Month 8',
    'Month 9',
    'Month 10',
    'Month 11',
    'Month 12',
];

const items = [
    { value: 10, label: 'Series A ( no Id )' },
    { id: 'id_B', value: 15, label: 'Series B' },
    { id: 'id_C', value: 20, label: 'Series C' },
];

const ChartDashboard = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                gap: '40px',
            }}
        >
            <Box
                sx={{
                    backgroundColor: '#f1eee4',
                    marginY: '50px',
                    padding: '20px',
                    width: '50%',
                    borderRadius: '20px',
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center',
                }}
            >
                <LineChart
                    width={500}
                    height={300}
                    series={[
                        { data: pData, label: 'Sales' },
                        { data: uData, label: 'Orders' },
                    ]}
                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                />
            </Box>

            <Box
                sx={{
                    backgroundColor: '#f1eee4',
                    marginY: '50px',
                    padding: '20px',
                    width: '50%',
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '30px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: '20px',
                    }}
                >
                    Best Selling Charts
                </Typography>
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    alignItems={{ xs: 'flex-start', md: 'center' }}
                    justifyContent="space-between"
                    sx={{ width: '100%' }}
                >
                    <PieChart
                        series={[
                            {
                                data: items,
                            },
                        ]}
                        // onClick={handleClick}
                        width={400}
                        height={200}
                        margin={{ right: 200 }}
                    />
                </Stack>
            </Box>
        </Box>
    );
};

export default ChartDashboard;
