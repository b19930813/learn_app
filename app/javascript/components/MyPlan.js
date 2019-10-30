import React from 'react'
import LoginForm from './LoginForm'
// class MyPlan extends React.Component {
//     render() {
//         return (
//             <div>
//             <LoginForm props={false}/>
//             </div>
//         )
//     }
// }

// export default MyPlan

export default function MyPlan(){
    return(
        <div>
            <LoginForm open = {true} />
        </div>
    )
}