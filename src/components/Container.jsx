import React from 'react';

const Container = ({children}) => {
    return (
        <div style={{width:"100%", minHeight:"50vh"}}>
            {children}
        </div>
    );
};

export default Container;