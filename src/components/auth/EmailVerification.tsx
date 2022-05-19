import { Box, Grid, LinearProgress } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { API_URL } from '../../env';

export default function EmailVerification() {
    const EmailStatus = {
        Verifying: 'Verifying',
        Failed: 'Failed'
    }

    const [emailStatus, setEmailStatus] = useState(EmailStatus.Verifying);
    const [searchParams, ] = useSearchParams();
    const naviguate = useNavigate();

    useEffect(() => {
        (async () => {
            const token = searchParams.get('token');
            if (token) {
                try {
                    await axios.get(`${API_URL}user/verify/${token}`);
                    naviguate('/signin');
                }
                catch (error) {
                    setEmailStatus(EmailStatus.Failed);
                }
            }
        })();
    }, []);

    function getBody() {
        switch (emailStatus) {
            case EmailStatus.Verifying:
                return (
                <div>
                    Verifying...
                    <Box sx={{ width:'100%', marginTop: '30px', justifyContent: 'center', alignContent:'center', alignItems: 'center' }}>
                        <LinearProgress />
                    </Box>
                </div>);
            case EmailStatus.Failed:
                return <div>Verification failed. If this is a mistake, <Link to="/resendmail">ask for a new link.</Link></div>;
        }
    }

    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <div>
            <h3 className="card-header">Email verification</h3>
            <div className="card-body">{getBody()}</div>
        </div>
      </Grid>

    )
}
