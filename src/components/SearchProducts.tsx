import { SearchIcon } from "lucide-react"
import { Input } from "./ui/input"

export const SearchProducts = () => {
    return (
        <form className="relative">
            <SearchIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                type="search"
                placeholder='Buscar productos...'
                className="pl-8"
            />
        </form>
    )
}
