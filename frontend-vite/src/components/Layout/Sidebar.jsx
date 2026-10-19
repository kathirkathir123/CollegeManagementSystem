/**
 * Sidebar
 * A chalkboard rail on desktop; the same board slides in as a drawer on mobile.
 */

import React from 'react';
import { Drawer, Box, Typography, ButtonBase, Switch } from '@mui/material';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../common/Logo';
import { mainNav, settingsNav } from './navItems';
import { useTheme } from '../../context/ThemeContext';
import { board, fonts, drawerWidth } from '../../theme/tokens';

const NavLink = ({ item, active, onClick }) => (
    <ButtonBase
        onClick={onClick}
        aria-current={active ? 'page' : undefined}
        focusRipple
        sx={{
            position: 'relative',
            width: '100%',
            justifyContent: 'flex-start',
            gap: 1.5,
            px: 2,
            py: 1.1,
            borderRadius: '8px',
            fontFamily: fonts.body,
            fontSize: '0.95rem',
            fontWeight: active ? 600 : 500,
            color: active ? board.chalk : board.chalkDim,
            bgcolor: active ? 'rgba(242,239,230,0.09)' : 'transparent',
            transition: 'background-color .15s, color .15s',
            '&:hover': { bgcolor: 'rgba(242,239,230,0.07)', color: board.chalk },
            // the chalk tick marking the current page
            '&::before': {
                content: '""',
                position: 'absolute',
                left: -12,
                top: 8,
                bottom: 8,
                width: 4,
                borderRadius: '0 4px 4px 0',
                bgcolor: board.marigold,
                opacity: active ? 1 : 0,
            },
            '& svg': { color: active ? board.marigold : 'inherit' },
        }}
    >
        {item.icon}
        {item.text}
    </ButtonBase>
);

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { darkMode, toggleDarkMode } = useTheme();

    const go = (path, closeDrawer) => {
        navigate(path);
        if (closeDrawer) handleDrawerToggle();
    };

    const content = (closeDrawer) => (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                px: 3,
                py: 3,
                color: board.chalk,
                bgcolor: board.base,
                // hairline chalk frame inside the board
                boxShadow: `inset 0 0 0 1px ${board.chalkLine}`,
            }}
        >
            <ButtonBase
                onClick={() => go('/', closeDrawer)}
                sx={{ justifyContent: 'flex-start', gap: 1.5, mb: 4, textAlign: 'left', borderRadius: 1 }}
            >
                <Logo size={34} color={board.marigold} />
                <Box>
                    <Typography
                        sx={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '1.35rem', lineHeight: 1, letterSpacing: '-0.02em' }}
                    >
                        SRMS
                    </Typography>
                    <Typography sx={{ fontSize: '0.78rem', color: board.chalkDim, mt: 0.4 }}>
                        Student records
                    </Typography>
                </Box>
            </ButtonBase>

            <Box component="nav" aria-label="Main" sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, flexGrow: 1 }}>
                {mainNav.map((item) => (
                    <NavLink
                        key={item.path}
                        item={item}
                        active={location.pathname === item.path}
                        onClick={() => go(item.path, closeDrawer)}
                    />
                ))}
            </Box>

            <Box sx={{ borderTop: `1px solid ${board.chalkLine}`, pt: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <NavLink
                    item={settingsNav}
                    active={location.pathname === settingsNav.path}
                    onClick={() => go(settingsNav.path, closeDrawer)}
                />
                <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, color: board.chalkDim }}
                >
                    {darkMode ? <DarkModeOutlined fontSize="small" /> : <LightModeOutlined fontSize="small" />}
                    <Typography sx={{ flexGrow: 1, fontSize: '0.95rem', fontWeight: 500 }}>Dark mode</Typography>
                    <Switch
                        size="small"
                        checked={darkMode}
                        onChange={toggleDarkMode}
                        inputProps={{ 'aria-label': 'Toggle dark mode' }}
                        sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': { color: board.marigold },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: board.marigold },
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );

    return (
        <Box component="aside" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { width: 'min(300px, 85vw)', boxSizing: 'border-box', border: 0 },
                }}
            >
                {content(true)}
            </Drawer>
            <Drawer
                variant="permanent"
                open
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', border: 0 },
                }}
            >
                {content(false)}
            </Drawer>
        </Box>
    );
};

export default Sidebar;
