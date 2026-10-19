/**
 * Dashboard
 * A chalkboard "roll call" for the headline numbers, then who joined recently
 * and who still owes fees.
 */

import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Chip, CircularProgress, Avatar, Button } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { studentAPI, courseAPI, feeAPI, attendanceAPI } from '../../services/api';
import { board, ink, fonts } from '../../theme/tokens';
import { useNavigate } from 'react-router-dom';

const Stat = ({ label, value, children }) => (
    <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ color: board.chalkDim, fontSize: '0.9rem', fontWeight: 500 }}>{label}</Typography>
        <Typography
            sx={{
                fontFamily: fonts.heading,
                fontWeight: 700,
                color: board.chalk,
                fontSize: { xs: '2.25rem', md: '3.25rem' },
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                mt: 0.5,
            }}
        >
            {value}
        </Typography>
        {children}
    </Box>
);

const Panel = ({ title, action, children }) => (
    <Paper variant="outlined" sx={{ overflow: 'hidden', height: '100%' }}>
        <Box
            sx={{
                px: 2.5,
                py: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Typography variant="h6">{title}</Typography>
            {action}
        </Box>
        {children}
    </Paper>
);

const Empty = ({ children }) => (
    <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
            {children}
        </Typography>
    </Box>
);

const Row = ({ children, last }) => (
    <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.75,
            px: 2.5,
            py: 1.5,
            borderBottom: last ? 0 : '1px solid',
            borderColor: 'divider',
        }}
    >
        {children}
    </Box>
);

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ students: 0, courses: 0, fees: 0, attendance: 0 });
    const [recentStudents, setRecentStudents] = useState([]);
    const [unpaidFees, setUnpaidFees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [studentsRes, coursesRes, feesRes, unpaidRes] = await Promise.all([
                studentAPI.getAll(),
                courseAPI.getAll(),
                feeAPI.getAll(),
                feeAPI.getUnpaid(),
            ]);

            let totalAttendance = 0;
            let attendanceCount = 0;
            for (const student of studentsRes.data) {
                try {
                    const attRes = await attendanceAPI.getPercentage(student.id);
                    if (attRes.data > 0) {
                        totalAttendance += attRes.data;
                        attendanceCount++;
                    }
                } catch {
                    // Student has no attendance records — skip
                }
            }

            setStats({
                students: studentsRes.data.length,
                courses: coursesRes.data.length,
                fees: feesRes.data.length,
                attendance:
                    attendanceCount > 0 ? Math.round(totalAttendance / attendanceCount) : 0,
            });

            setRecentStudents(studentsRes.data.slice(0, 5));
            setUnpaidFees(unpaidRes.data);
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <CircularProgress size={32} />
            </Box>
        );
    }

    const today = new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    });

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4">Dashboard</Typography>
                <Typography color="text.secondary" sx={{ mt: 0.75 }}>
                    {today}
                </Typography>
            </Box>

            {/* The board */}
            <Box
                sx={{
                    position: 'relative',
                    bgcolor: board.base,
                    borderRadius: '14px',
                    p: { xs: 3, md: 4.5 },
                    mb: 3,
                    display: 'grid',
                    gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                    gap: { xs: 3.5, md: 4 },
                    // chalk frame
                    outline: `1px solid ${board.chalkLine}`,
                    outlineOffset: -9,
                }}
            >
                <Stat label="Students" value={stats.students} />
                <Stat label="Courses" value={stats.courses} />
                <Stat label="Fee records" value={stats.fees} />
                <Stat label="Average attendance" value={`${stats.attendance}%`}>
                    {/* a chalk line that fills to the attendance figure */}
                    <Box
                        role="img"
                        aria-label={`Average attendance ${stats.attendance} percent`}
                        sx={{ mt: 1.5, height: 4, borderRadius: 2, bgcolor: board.chalkLine }}
                    >
                        <Box
                            sx={{
                                height: '100%',
                                width: `${Math.min(stats.attendance, 100)}%`,
                                borderRadius: 2,
                                bgcolor: board.marigold,
                            }}
                        />
                    </Box>
                </Stat>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                <Panel
                    title="Recently added"
                    action={
                        <Button size="small" onClick={() => navigate('/students')}>
                            All students
                        </Button>
                    }
                >
                    {recentStudents.length === 0 ? (
                        <Empty>No students yet. Add the first one from the Students page.</Empty>
                    ) : (
                        recentStudents.map((s, i) => (
                            <Row key={s.id} last={i === recentStudents.length - 1}>
                                <Avatar
                                    variant="rounded"
                                    sx={(t) => ({
                                        width: 40,
                                        height: 40,
                                        fontFamily: fonts.heading,
                                        fontWeight: 700,
                                        fontSize: '0.95rem',
                                        color: t.palette.mode === 'dark' ? board.marigold : board.base,
                                        bgcolor: alpha(board.marigold, t.palette.mode === 'dark' ? 0.14 : 0.3),
                                    })}
                                >
                                    {(s.firstName?.[0] || '') + (s.lastName?.[0] || '')}
                                </Avatar>
                                <Box sx={{ minWidth: 0 }}>
                                    <Typography sx={{ fontWeight: 600 }} noWrap>
                                        {s.firstName} {s.lastName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" noWrap>
                                        {[s.email, s.phone].filter(Boolean).join('  |  ')}
                                    </Typography>
                                </Box>
                            </Row>
                        ))
                    )}
                </Panel>

                <Panel
                    title="Fees to collect"
                    action={
                        <Button size="small" onClick={() => navigate('/fees')}>
                            All fees
                        </Button>
                    }
                >
                    {unpaidFees.length === 0 ? (
                        <Empty>Every fee is paid.</Empty>
                    ) : (
                        unpaidFees.map((fee, i) => (
                            <Row key={fee.id} last={i === unpaidFees.length - 1}>
                                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                    <Typography sx={{ fontWeight: 600 }} noWrap>
                                        {fee.student.firstName} {fee.student.lastName}
                                    </Typography>
                                    <Chip
                                        label={fee.status === 'UNPAID' ? 'Unpaid' : 'Partly paid'}
                                        color={fee.status === 'UNPAID' ? 'error' : 'warning'}
                                        size="small"
                                        variant="outlined"
                                        sx={{ mt: 0.5 }}
                                    />
                                </Box>
                                <Typography
                                    sx={{
                                        fontFamily: fonts.heading,
                                        fontWeight: 700,
                                        fontSize: '1.15rem',
                                        color: ink.red,
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    ₹{(fee.totalFee - fee.amountPaid).toFixed(2)}
                                </Typography>
                            </Row>
                        ))
                    )}
                </Panel>
            </Box>
        </Box>
    );
};

export default Dashboard;
