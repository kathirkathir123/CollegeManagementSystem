import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline, alpha } from '@mui/material';
import { board, ink, fonts } from '../theme/tokens';

const ThemeContext = createContext({ darkMode: false, toggleDarkMode: () => {} });

export const useTheme = () => useContext(ThemeContext);

const buildTheme = (darkMode) => {
    const divider = darkMode ? '#27362F' : '#DADED3';
    const paper = darkMode ? '#16211E' : '#FFFFFF';
    const textPrimary = darkMode ? '#E9E7DD' : '#1B2421';
    const textSecondary = darkMode ? '#9BAAA3' : '#55625D';

    return createTheme({
        breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 } },
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: darkMode
                ? { main: board.marigold, light: '#F7CD6B', dark: '#D99A14', contrastText: '#1B2421' }
                : { main: board.base, light: '#3B5D54', dark: board.deep, contrastText: '#F7F5EC' },
            secondary: { main: board.marigold, contrastText: '#1B2421' },
            success: { main: ink.green },
            error: { main: ink.red },
            warning: { main: '#D98E04' },
            info: { main: ink.blue },
            background: {
                default: darkMode ? '#0F1715' : '#F3F4EE',
                paper,
            },
            text: { primary: textPrimary, secondary: textSecondary },
            divider,
        },
        typography: {
            fontFamily: fonts.body,
            h1: { fontFamily: fonts.heading, fontWeight: 700 },
            h2: { fontFamily: fonts.heading, fontWeight: 700 },
            h3: { fontFamily: fonts.heading, fontWeight: 700 },
            h4: {
                fontFamily: fonts.heading,
                fontWeight: 700,
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
                fontSize: '1.75rem',
                '@media (min-width:900px)': { fontSize: '2.25rem' },
            },
            h5: { fontFamily: fonts.heading, fontWeight: 600, letterSpacing: '-0.015em' },
            h6: { fontFamily: fonts.heading, fontWeight: 600, fontSize: '1.05rem', letterSpacing: '-0.01em' },
            subtitle1: { fontWeight: 600 },
            button: { textTransform: 'none', fontWeight: 600, letterSpacing: 0 },
        },
        shape: { borderRadius: 8 },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: { fontFeatureSettings: '"tnum" 1, "kern" 1' },
                    '::selection': { background: board.marigold, color: '#1B2421' },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: { backgroundImage: 'none' },
                    // Flat, ruled surfaces instead of floating shadow cards
                    elevation1: { boxShadow: 'none', border: `1px solid ${divider}`, borderRadius: 10 },
                    outlined: { borderColor: divider, borderRadius: 10 },
                },
            },
            MuiCard: {
                styleOverrides: { root: { backgroundImage: 'none', borderRadius: 10 } },
            },
            MuiButton: {
                defaultProps: { disableElevation: true },
                styleOverrides: {
                    root: { borderRadius: 8, minHeight: 40, paddingInline: 18 },
                    sizeSmall: { minHeight: 32 },
                    outlinedPrimary: { borderColor: darkMode ? alpha('#fff', 0.28) : alpha(board.base, 0.35) },
                },
            },
            MuiIconButton: {
                styleOverrides: { root: { borderRadius: 8 }, sizeSmall: { padding: 8 } },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        backgroundColor: darkMode ? alpha('#fff', 0.03) : '#FBFBF8',
                    },
                    notchedOutline: { borderColor: divider },
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: { borderRadius: 5, fontWeight: 600, letterSpacing: 0.1 },
                    sizeSmall: { height: 24, fontSize: '0.75rem' },
                },
            },
            MuiTableContainer: {
                styleOverrides: { root: { overflowX: 'auto' } },
            },
            MuiTableCell: {
                styleOverrides: {
                    root: { borderBottom: `1px solid ${divider}`, padding: '14px 16px', fontSize: '0.9rem' },
                    head: {
                        fontFamily: fonts.heading,
                        fontWeight: 600,
                        fontSize: '0.82rem',
                        color: textSecondary,
                        whiteSpace: 'nowrap',
                        borderBottom: `2px solid ${textPrimary}`,
                        backgroundColor: 'transparent',
                    },
                },
            },
            MuiTableRow: {
                styleOverrides: {
                    root: { '&:last-child td': { borderBottom: 0 } },
                    hover: { '&:hover': { backgroundColor: alpha(board.marigold, darkMode ? 0.07 : 0.12) } },
                },
            },
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        borderRadius: 14,
                        border: `1px solid ${divider}`,
                        '@media (max-width:599.95px)': {
                            margin: 12,
                            width: 'calc(100% - 24px)',
                            maxWidth: 'calc(100% - 24px)',
                            maxHeight: 'calc(100% - 24px)',
                        },
                    },
                },
            },
            MuiDialogTitle: {
                styleOverrides: {
                    root: { fontFamily: fonts.heading, fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.01em' },
                },
            },
            MuiDialogActions: { styleOverrides: { root: { padding: '12px 24px 20px' } } },
            MuiAlert: { styleOverrides: { root: { borderRadius: 8 } } },
            MuiSnackbar: {
                styleOverrides: {
                    root: {
                        // keep toasts clear of the mobile bottom navigation
                        '@media (max-width:899.95px)': { bottom: 'calc(76px + env(safe-area-inset-bottom))' },
                    },
                },
            },
        },
    });
};

export const CustomThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(
        () => localStorage.getItem('darkMode') === 'true'
    );

    useEffect(() => {
        localStorage.setItem('darkMode', String(darkMode));
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode((p) => !p);
    const theme = useMemo(() => buildTheme(darkMode), [darkMode]);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
