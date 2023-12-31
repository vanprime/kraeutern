import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner";
import { Crown } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"

const FormSchema = z.object({
    email: z.string().email({
        message: "Invalid email address.",
    }),
});
function Signup() {

    const [submitted, setSubmitted] = useState(false)

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit(data) {
        console.log(data)
        toast("You submitted the following values:",
            {
                description: JSON.stringify(data, null, 2)
            }
        )
        setSubmitted(true)
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 w-full">
                    <h1 className="text-2xl border-b-2">Kräutern.</h1>
                    <p>Wenn du ein Spiel hosten willst, musst du dich über einloggen. </p>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>email</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Es wird kein Account erstellt.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="" type="submit"><Crown className="mr-2" />Spiel Hosten</Button>
                </form>
            </Form>
            <div className="py-4 flex">
                <Button asChild className="w-full" variant="secondary">
                    <Link to="/games">
                        Mitspielen
                    </Link>
                </Button>
            </div>
        </>
    )
}

export default Signup