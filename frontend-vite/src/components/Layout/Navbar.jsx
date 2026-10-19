/**
 * Navbar
 * Mobile-only top bar (desktop uses the chalkboard rail).
 */

import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import { useNavigate } from 'react-router-dom';
import Logo from '../common/Logo';
import { useTheme } from '../../context/ThemeContext';
import { board, fonts } from '../../theme/tokens';

const Navbar = () => {
    const navigate = useNavigate();
    const { darkMode, toggleDarkMode } = useTheme();

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                display: { md: 'none' },
                bgcolor: board.base,
                color: board.chalk,
                pt: 'env(safe-area-inset-top)',
            }}
        >
            <Toolbar sx={{ minHeight: 56, px: 2 }}>
                <Box
                    onClick={() => navigate('/')}
                    role="link"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
                    sx={{ display: 'flex', alignItems: 'center', gap: 1.25, cursor: 'pointer', flexGrow: 1 }}
                >
                    <Logo size={28} color={board.marigold} />
                    <Typography sx={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '1.15rem', letterSpacing: '-0.02em' }}>
                        SRMS
                    </Typography>
                </Box>
                <IconButton
                    color="inherit"
                    onClick={toggleDarkMode}
                    aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {darkMode ? <LightModeOutlined /> : <DarkModeOutlined />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
