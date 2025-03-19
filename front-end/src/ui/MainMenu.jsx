import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

export default function MainMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
        <IconButton 
            edge="start" 
            color="inherit" 
            aria-label="menu" 
            sx={{ mr: 2 }}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
           
        >
            
        </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem 
          onClick={handleClose}
          component={Link}
          to="/"
          divider
          >
            Início
        </MenuItem>

        <MenuItem 
          onClick={handleClose}
          component={Link}
          to="/novocomponente"
          divider
          >
            Sobre a autora
        </MenuItem>

        <MenuItem 
          onClick={handleClose}
          component={Link}
          to="/customers"
          >
            Listagem de clientes
        </MenuItem>

        <MenuItem 
          onClick={handleClose}
          component={Link}
          to="/customers/new"
          >
            Cadastro de clientes
        </MenuItem>
 
        <MenuItem 
          onClick={handleClose}
          component={Link}
          to="/cars"
          >
            Listagem de veículos
        </MenuItem>

        <MenuItem 
          onClick={handleClose}
          component={Link}
          to="/cars/new"
          >
            Cadastro de veículos
        </MenuItem>
      </Menu>
    </div>
  );
}
