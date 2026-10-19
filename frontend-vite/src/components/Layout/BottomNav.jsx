/**
 * BottomNav
 * Thumb-reach navigation for phones and small tablets. "Menu" opens the full board.
 */

import React from 'react';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import MenuRounded from '@mui/icons-material/MenuRounded';
import { useNavigate, useLocation } from 'react-router-dom';
import { mainNav } from './navItems';
import { board, fonts } from '../../theme/tokens';

// Dashboard, Students, Courses and Fees get a tab; the rest live under Menu
const tabs = mainNav.filter((i) => ['/', '/students', '/courses', '/fees'].includes(i.path));

const BottomNav = ({ onMenu }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const current = tabs.some((t) => t.path === pathname) ? pathname : 'menu';

    return (
        <Paper
            component="nav"
            aria-label="Primary"
            square
            sx={{
                display: { md: 'none' },
                position: 'fixed',
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: (t) => t.zIndex.appBar,
                borderRadius: 0,
                border: 0,
                borderTop: '1px solid',
                borderColor: 'divider',
                pb: 'env(safe-area-inset-bottom)',
            }}
        >
            <BottomNavigation
                showLabels
                value={current}
                sx={{
                    height: 64,
                    bgcolor: 'transparent',
                    '& .MuiBottomNavigationAction-root': { minWidth: 0, color: 'text.secondary', pt: 1 },
                    '& .MuiBottomNavigationAction-label': { fontFamily: fonts.body, fontSize: '0.72rem', fontWeight: 500 },
                    '& .Mui-selected': { color: 'text.primary' },
                    '& .Mui-selected .MuiBottomNavigationAction-label': { fontSize: '0.72rem', fontWeight: 700 },
                    // a chalk-yellow tick over the active tab
                    '& .Mui-selected::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        width: 28,
                        height: 3,
                        borderRadius: '0 0 3px 3px',
                        bgcolor: board.marigold,
                    },
                }}
            >
                {tabs.map((t) => (
                    <BottomNavigationAction
                        key={t.path}
                        value={t.path}
                        label={t.text}
                        icon={t.icon}
                        onClick={() => navigate(t.path)}
                        sx={{ position: 'relative' }}
                    />
                ))}
                <BottomNavigationAction
                    value="menu"
                    label="Menu"
                    icon={<MenuRounded fontSize="small" />}
                    onClick={onMenu}
                    sx={{ position: 'relative' }}
                />
            </BottomNavigation>
        </Paper>
    );
};

export default BottomNav;
