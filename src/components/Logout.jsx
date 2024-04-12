import { useAuth } from './AuthProvider';

export default function Logout(){
    const auth = useAuth();

    auth.logOut();

    
}