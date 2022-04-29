import { Box, Grid, LinearProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';


export default function EmailVerification() {
    const EmailStatus = {
        Verifying: 'Verifying',
        Failed: 'Failed'
    }

    const [emailStatus, ] = useState(EmailStatus.Verifying);
    const [searchParams, ] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');
        console.log(token);
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
                return <div>Verification failed, you can also verify your account using the <Link to="forgot-password">forgot password</Link> page.</div>;
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
            <h3 className="card-header">Verify Email</h3>
            <div className="card-body">{getBody()}</div>
        </div>
      </Grid>

    )
}
