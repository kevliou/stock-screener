import React from 'react';
import { Container, Divider, IconButton, Typography } from '@material-ui/core';
import './Footer.css';
import { Email, GitHub, LinkedIn } from '@material-ui/icons';

function Footer(props) {
  const linkedInUrl = 'https://www.linkedin.com/in/kevinliou'
  const gitHubUrl = 'https://github.com/kevliou/stock-screener'

  function handleOpenUrlInNewTab(url) {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  function handleSendEmail() {
    window.location.href = 'mailto:kliou879@gmail.com?subject=Greetings!';
  }

  return (
    <footer className="footer">
      <Container maxWidth="md">
        <Divider className="divider" />
        <div className="footer-signature">
          <Typography
            display="block"
            color="secondary"
            className="name"
          >
            {"\u00A9 " + new Date().getFullYear() + " Kevin Liou"}
          </Typography>
          <div>
            <IconButton
              size="medium"
              aria-label="Github"
              color="secondary"
              onClick={() => handleOpenUrlInNewTab(gitHubUrl)}
            >
              <GitHub />
            </IconButton>
            <IconButton
              size="medium"
              aria-label="LinkedIn"
              color="secondary"
              onClick={() => handleOpenUrlInNewTab(linkedInUrl)}
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              size="medium"
              aria-label="email"
              color="secondary"
              onClick={handleSendEmail}
            >
              <Email />
            </IconButton>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer