import React, { ReactNode } from 'react';

interface LoginLayoutProps {
    children: ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
    return (
        <div style={styles.container}>
            <div style={styles.loginBox}>
                {children}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#000',
    },
    loginBox: {
        width: '500px',
        padding: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#3C3D37',
        borderRadius: '8px',
    },
};

export default LoginLayout;