import { useAuthContext } from "@/providers/auth-provider";

function AuthPage() {
    const session = useAuthContext();

    console.log(session)

    return (
        <div className='flex flex-col p-6 m-auto min-w-72 max-w-full bg-muted rounded-xl text-center'>
            <h1> Auth Page here </h1 >
            {session && (JSON.stringify(session))}
        </div>
    );
}

export default AuthPage;