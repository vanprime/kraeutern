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
                        description: `Hello ${data.user.email}!`,
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

    return (
        <AuthContext.Provider value={session}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext)