import Animation from '@/Components/user/layouts/Animation';
import { Container } from '@mui/material';

export default function Home() {
    return (
        <div className="bg-blue-300">
            <Animation />
            <Container maxWidth="lg" sx={{ height: '1200px' }}>
                <h1>Hello</h1>
            </Container>
        </div>
    );
}
