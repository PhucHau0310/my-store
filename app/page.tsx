import { Button, Container } from '@mui/material';

export default function Home() {
    return (
        <div>
            <Container
                maxWidth="lg"
                className="bg-orange-500 fixed top-0 left-0 right-0"
            >
                <Button>Hello</Button>
            </Container>
            <div className="h-[5000px] bg-slate-500"></div>
        </div>
    );
}
