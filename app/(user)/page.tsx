import BestDeal from '@/Components/user/items/BestDeal';
import Feature from '@/Components/user/items/Feature';
import GetUp from '@/Components/user/items/GetUp';
import TopCategories from '@/Components/user/items/TopCategories';
import Animation from '@/Components/user/layouts/Animation';
import CashBack from '@/Components/user/layouts/CashBack';
import { Container, Fab } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="">
            <Animation />
            <Container maxWidth="lg" sx={{ marginY: '50px' }}>
                <TopCategories />
                <BestDeal />
                <GetUp />
                <CashBack />
                <Feature />

                <Link href={'/dashboard'}>
                    <Fab
                        variant="extended"
                        sx={{
                            position: 'fixed',
                            right: '10px',
                            bottom: '40px',
                        }}
                    >
                        <NavigationIcon sx={{ mr: 1 }} />
                        DashBoard
                    </Fab>
                </Link>
            </Container>
        </div>
    );
}
