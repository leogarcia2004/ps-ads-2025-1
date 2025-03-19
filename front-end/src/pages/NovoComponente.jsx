import * as React from 'react';
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import minhaFoto from '../assets/minhafoto2.jpeg'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function NovoComponente() {
    // Declarando uma variavel de estado usando o Lazy initializer
    const [likes, setLikes] = React.useState(
        () => window.localStorage.getItem('likes') ?? 0
      )
    // usando o useEffect para salvar o valor de likes no localStorage
    React.useEffect(() => {
        window.localStorage.setItem('likes', likes)
      }, [likes])

    return (
        <>
            {/* Título*/}
            <Typography variant="h4" gutterBottom>Sobre a autora</Typography>

            {/* Cartão*/}
            <Card sx={{ maxWidth: 345 }}>

                <CardMedia
                    sx={{ height: 400 }}
                    image={minhaFoto}
                    title="minhafoto"
                />

                <CardContent>
                    {/* meu nome*/}
                    <Typography gutterBottom variant="h5" component="div">
                    Rafaela Aparecida Dos Santos
                    </Typography>

                    {/* Texto sobre mim*/}
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Sou estudante de Análise e Desenvolvimento de Sistemas na Faculdade de 
                    Tecnologia - Fatec Franca, com uma paixão intensa por tecnologia e inovação. 
                    Estou ansiosa para iniciar minha carreira e aplicar meus conhecimentos em um ambiente 
                    profissional desafiador e colaborativo.
                    </Typography>
                </CardContent>
                
                <CardActions>
                {/* Botão pra dar like*/}
                <Button 
            variant="contained" 
            color="secondary" 
            startIcon={<FavoriteBorderIcon />}
            onClick={() => setLikes(Number(likes) + 1)}
          >
            CURTIR ({likes})
          </Button>
                </CardActions>
            </Card>
        </>
    );
}
