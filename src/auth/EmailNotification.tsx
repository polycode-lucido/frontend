import { Box, Grid, LinearProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';


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
            </div>
        </div>
      </Grid>

    )
}
