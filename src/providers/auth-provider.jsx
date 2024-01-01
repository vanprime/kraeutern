import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [session, setSession] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await supabase.auth.getSession();
                setSession(data.session);
                if (data.session) {
                    toast.success('Logged in successfully!', {
                        description: `Hello ${data.session.user.email}!`,
                    });
                }
            } catch (error) {
                setSession(null)
                console.error('Failed to get session:', error);
            }
        };

        fetchData();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    async function handleLogout() {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.log(error)
            toast.error(`Failed to log out`, { description: error.message });
        }
    }

    return (
        <AuthContext.Provider value={{ session, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext)