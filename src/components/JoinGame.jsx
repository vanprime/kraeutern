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
import { useGamestateContext } from "@/providers/gamestate-provider"
import { useNavigate } from "react-router-dom"
import { ArrowBigRight } from "lucide-react"

const FormSchema = z.object({
    gameId: z.string().min(3, 'Input is too short.').max(37, 'Input is too long.'),
});

function JoinGame() {

    const navigate = useNavigate();
    const { handleManualJoinGameRoom } = useGamestateContext()

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            gameId: "",
        },
        mode: 'onBlur',
    })

    async function onSubmit(data) {
        try {
            const success = await handleManualJoinGameRoom(data.gameId);
            if (success) {
                toast("Joining Game", { description: `Joining Game ${data.gameId}` })
                navigate(`/buzzern`);
            }
        } catch (error) {
        }
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
                        Join game <ArrowBigRight className="ml-[1ch] h-4 w-4" />
                    </Button>
                </form>
            </Form>
        </>
    );
}

export default JoinGame;