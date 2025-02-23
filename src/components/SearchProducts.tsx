import { SearchIcon } from "lucide-react"
import { Input } from "./ui/input"
import { ChangeEvent } from "react"

export const SearchProducts = ({ searchValue,searchOnChange } : {searchValue: string,searchOnChange: (e: ChangeEvent<HTMLInputElement>) => void}) => {
    return (
        <form className="relative" onSubmit={(e) => e.preventDefault()}>
            <SearchIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                type="search"
                value={ searchValue }
                onChange={(e) => searchOnChange(e)}
                placeholder='Buscar productos...'
                className="pl-8"
            />
        </form>
    )
}
