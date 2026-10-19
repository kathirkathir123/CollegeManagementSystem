/**
 * Layout
 * Desktop: chalkboard rail + content.  Mobile: top bar, content, bottom tabs.
 */

import React, { useState } from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

const Layout = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const toggleDrawer = () => setMobileOpen((prev) => !prev);

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={toggleDrawer} />
            <Box component="main" sx={{ flexGrow: 1, minWidth: 0 }}>
                <Navbar />
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 1240,
                        mx: 'auto',
                        px: { xs: 2, sm: 3, md: 5 },
                        pt: { xs: 3, md: 5 },
                        pb: { xs: 'calc(88px + env(safe-area-inset-bottom))', md: 6 },
                    }}
                >
                    {children}
                </Box>
            </Box>
            <BottomNav onMenu={toggleDrawer} />
        </Box>
    );
};

export default Layout;
