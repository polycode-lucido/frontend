import { Grid, Link } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';


export default function EmailNotification() {
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
            <h3 className="card-header">Check your inbox</h3>
            <div className="card-body">
                <p>
                    An email has been sent to your email address. Please click on the link in the email to verify your email address.
                </p>
                <Link component={RouterLink} to='/signin'>
                  {"I have already verified my email"}
                </Link>
            </div>
        </div>
      </Grid>

    )
}
