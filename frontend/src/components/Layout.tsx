import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { 
  AppBar, 
  Box, 
  Container, 
  CssBaseline, 
  Toolbar, 
  Typography, 
  Button, 
  Stack,
  useScrollTrigger,
  Slide
} from '@mui/material';
import { CalendarToday, ViewList, Add } from '@mui/icons-material';

interface Props {
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Layout: React.FC = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
      backgroundAttachment: 'fixed'
    }}>
      <CssBaseline />
      <HideOnScroll>
        <AppBar position="fixed" elevation={0} sx={{
          background: 'rgba(102, 126, 234, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <Toolbar sx={{ px: { xs: 2, sm: 3 }, py: 1 }}>
            <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
              <CalendarToday sx={{ 
                mr: 2, 
                fontSize: 32,
                color: 'white',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                animation: 'float 3s ease-in-out infinite'
              }} />
              <Typography 
                variant="h4" 
                component="h1" 
                sx={{ 
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #ffffff 20%, #e2e8f0 80%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  letterSpacing: '-0.025em',
                }}
              >
                ReserveNow
              </Typography>
            </Box>            <Stack direction="row" spacing={2}>
              <Button 
                color="inherit" 
                component={Link} 
                to="/"
                className="modern-button"
                sx={{ 
                  color: 'white',
                  fontWeight: 600,
                  px: 3,
                  py: 1.5,
                  borderRadius: 3,
                  '&:hover': { 
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                Home
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/reservations"
                startIcon={<ViewList />}
                className="modern-button"
                sx={{ 
                  color: 'white',
                  fontWeight: 600,
                  px: 3,
                  py: 1.5,
                  borderRadius: 3,
                  '&:hover': { 
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                Reservations
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/reservations/new"
                startIcon={<Add />}
                variant="contained"
                className="modern-button"
                sx={{ 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
                  color: 'white',
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  border: '1px solid rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': { 
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.2) 100%)',
                    transform: 'translateY(-2px) scale(1.05)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.2)'
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                New
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {/* Toolbar spacer */}
      <Toolbar />      {/* Main Content */}
      <Box sx={{ 
        py: { xs: 4, sm: 6 },
        px: { xs: 2, sm: 3 },
        minHeight: 'calc(100vh - 64px)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100px',
          background: 'linear-gradient(180deg, rgba(102, 126, 234, 0.05) 0%, transparent 100%)',
          pointerEvents: 'none',
        }
      }}>
        <Container maxWidth="xl" sx={{ 
          px: { xs: 0, sm: 2 },
          position: 'relative',
          zIndex: 1
        }}>
          <Box className="fade-in-up">
            <Outlet />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
