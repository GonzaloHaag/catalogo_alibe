import { ShoppingBagIcon } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
export const Header = () => {
    return (
        <header className="bg-white shadow-md p-4 flex items-center justify-between">
            <img src="/images/logo.webp" alt="logo alibe" width={140} height={140} loading="eager" />
            <Sheet>
                <SheetTrigger asChild>
                <ShoppingBagIcon size={25} className='text-neutral-900 cursor-pointer' />
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Edit profile</SheetTitle>
                        <SheetDescription>
                            Make changes to your profile here. Click save when you're done.
                        </SheetDescription>
                    </SheetHeader>
                    <SheetFooter>
                        <SheetClose asChild>
                            footer
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </header>
    )
}
