import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Check, X } from "lucide-react"


export const Tile = ({ question, value, onAnswered, category }) => {

    if (question.answered) {
        return (
            <div className="jeopardy-tile-solved flex items-center justify-center text-center rounded p-3 min-h-28 m-1.5 text-xl">
                {question.solution}
            </div>
        )

    }

    //TODO: get rid of the alert dialog
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="jeopardy-tile flex items-center justify-center p-3 min-h-28 border-2 m-1.5 rounded shadow-lg transition-colors hover:bg-yellow-300 hover:text-primary-foreground hover:border-yellow-200 cursor-pointer text-xl">
                    <div>{value}</div>
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[80%] border-0">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-3xl text-muted-foreground font-normal">{category} - {value}</AlertDialogTitle>
                    <AlertDialogDescription className="text-[3rem] text-foreground font-semibold text-center">
                        {question.question}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel><X /></AlertDialogCancel>
                    <AlertDialogAction onClick={() => onAnswered(category, value)}><Check /></AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}