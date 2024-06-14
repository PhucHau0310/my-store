import BestDeal from '@/Components/user/items/BestDeal';
import Feature from '@/Components/user/items/Feature';
import GetUp from '@/Components/user/items/GetUp';
import TopCategories from '@/Components/user/items/TopCategories';
import Animation from '@/Components/user/layouts/Animation';
import CashBack from '@/Components/user/layouts/CashBack';
import { Container } from '@mui/material';

export default function Home() {
    return (
        <div className="">
            <Animation />
            <Container maxWidth="lg">
                <TopCategories />
                <BestDeal />
                <GetUp />
                <CashBack />
                <Feature />
            </Container>
        </div>
    );
}
