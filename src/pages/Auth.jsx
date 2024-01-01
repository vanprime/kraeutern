import { useAuthContext } from "@/providers/auth-provider";

function AuthPage() {
    const session = useAuthContext();

    if (!session) return null

    return (
        <div className='flex flex-col p-6 m-auto min-w-72 max-w-full bg-muted rounded-xl'>
            <h1> Auth Page here </h1 >
            {session && <pre>
                {JSON.stringify(session, null, 2)}
            </pre>}
        </div>
    );
}

export default AuthPage;