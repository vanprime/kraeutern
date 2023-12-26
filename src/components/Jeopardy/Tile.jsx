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


export const Tile = ({ question, value, color, onAnswered, category }) => {

    if (question.answered) {
        return (
            <div className={`flex items-center justify-center p-3 min-h-28 m-1.5 rounded border-0 text-xl text-muted-foreground`}>
                {question.solution}
            </div>
        )

    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className={`jeopardy-tile flex items-center justify-center p-3 min-h-28 border-2 m-1.5 rounded  shadow-lg border-${color}-900 hover:bg-yellow-200 transition-colors hover:text-primary-foreground cursor-pointer text-xl`}>
                    <div>{value}</div>
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[80%]">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-3xl text-muted-foreground font-normal">{category} - {value}</AlertDialogTitle>
                    <AlertDialogDescription className="text-[10rem] text-foreground font-semibold text-center">
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