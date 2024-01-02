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
import { Crown, MailCheck } from "lucide-react"
import { useState } from "react"

const FormSchema = z.object({
    email: z.string().email({
        message: "Invalid email address.",
    }),
});

function Signup({ setSubmitted, setPageError }) {


    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
        },
        mode: 'onChange',
    });

    async function onSubmit(data) {
        console.log(data)
        toast(`Email sent to ${data.email}`,
            {
                description: "Please check your inbox and spam folder."
            }
        )
        setSubmitted(data.email)
        setPageError(null);
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 w-full">
                    <div>
                        <h1 className="text-2xl border-b-2">Kräutern.</h1>
                        <p className="text-sm">Wenn du ein Spiel hosten willst, musst du dich einloggen. </p>
                    </div>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder=""
                                        {...field}
                                        onBlur={e => {
                                            field.onBlur(e);
                                            if (!e.target.value) {
                                                form.clearErrors('email');
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Du bekommst einen Link. Es wird kein Account erstellt.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        disabled={!form.formState.isValid}
                        className=""
                        type="submit"
                    >
                        <Crown className="mr-2" />Spiel Hosten</Button>
                </form>
            </Form >
        </>
    )
}

export default Signup