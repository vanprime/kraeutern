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
import { useState } from "react"

const FormSchema = z.object({
    gameId: z.string().min(3, 'Input is too short.').max(10, 'Input is too long.'),
});

function JoinGame() {

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            gameId: "",
        },
        mode: 'onChange',
    })

    async function onSubmit(data) {
        console.log(data)
        toast(`You want to join ${data.gameId}`,
            {
                description: "Joining Game ID"
            }
        )
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 w-full">
                    <div>
                        <h1 className="text-2xl border-b-2">Mitspielen</h1>
                    </div>
                    <FormField
                        control={form.control}
                        name="gameId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Game ID</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder=""
                                        {...field}
                                        onBlur={e => {
                                            field.onBlur(e);
                                            if (!e.target.value) {
                                                form.clearErrors('gameId');
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Gib die Game ID ein, um einem Spiel beizutreten.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        variant="secondary"
                        disabled={!form.formState.isValid}
                    >
                        Join game
                    </Button>
                </form>
            </Form>
        </>
    );
}

export default JoinGame;