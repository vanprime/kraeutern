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

import { motion } from 'framer-motion';
import { container, item } from "@/lib/animationProps"

function Signup({ submitted, setSubmitted, setPageError }) {

    const [submittedTo, setSubmittedTo] = useState(null)

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
        setSubmittedTo(data.email)
        setSubmitted(true)
        setPageError(null);
    }

    if (submitted && submittedTo) {

        return (
            <motion.div className="grid gap-2" variants={container} initial="hidden" animate="show">
                <motion.div className="flex items-center text-2xl border-b-2" variants={item}>
                    <MailCheck className="mr-[1ch]" />
                    <h1> Success </h1>
                </motion.div>
                <motion.div className="text-slate-500" variants={item}>
                    <p>Check inbox and spam folder of <strong>{submittedTo}</strong> for an email from <em>Der Kanzler</em>.</p>
                    <br />
                    <p>Follow the Link to log in and create the Game. You can share the Game ID with your teams to have them buzzer.</p>
                </motion.div>
            </motion.div>
        )
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