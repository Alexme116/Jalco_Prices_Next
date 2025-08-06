import CircularProgress from "@mui/material/CircularProgress"
import { IconSettings, IconUserPentagon, IconLayoutDashboard, IconCircleDashedPlus,
    IconMenu2, IconSearch, IconArrowBackUp, IconTrash, IconMessage, IconCaretRight,
    IconCaretLeft, IconCaretDown, IconCaretUp, IconDots, IconEdit, IconMinus, IconPlus,
    IconReport, IconCheck
} from "@tabler/icons-react"

export const IconTweak = ({ color="black", h=undefined, w=undefined } : { color?: string, h?: string | undefined, w?: string | undefined }) => {
    return (
        <IconSettings stroke={2} color={color} height={h} width={w} />
    )
}

export const IconUser = ({ color="black", h=undefined, w=undefined } : { color?: string, h?: string | undefined, w?: string | undefined }) => {
    return (
        <IconUserPentagon stroke={2} color={color} height={h} width={w} />
    )
}

export const IconDashboard = ({ color="black", h=undefined, w=undefined } : { color?: string, h?: string | undefined, w?: string | undefined }) => {
    return (
        <IconLayoutDashboard stroke={2} color={color} height={h} width={w} />
    )
}

export const IconAdd = ({ color="black", h=undefined, w=undefined } : { color?: string, h?: string | undefined, w?: string | undefined }) => {
    return (
        <IconCircleDashedPlus stroke={2} color={color} height={h} width={w} />
    )
}

export const IconMenu = ({ color="black", h=undefined, w=undefined } : { color?: string, h?: string | undefined, w?: string | undefined }) => {
    return (
        <IconMenu2 stroke={2} color={color} height={h} width={w} />
    )
}

export const SearchIcon = ({ color="black", h=undefined, w=undefined } : { color?: string, h?: string | undefined, w?: string | undefined }) => {
    return (
        <IconSearch stroke={2} color={color} height={h} width={w} />
    )
}

export const ArrowReturnIcon = ({ color="black", h=undefined, w=undefined } : { color?: string, h?: string | undefined, w?: string | undefined }) => {
    return (
        <IconArrowBackUp stroke={2} color={color} height={h} width={w} />
    )
}

export const TrashIcon = ({ color="black", h=undefined, w=undefined } : { color?: string, h?: string | undefined, w?: string | undefined }) => {
    return (
        <IconTrash stroke={2} color={color} height={h} width={w} />
    )
}

export const MessageIcon = ({ color="black", h=undefined, w=undefined } : { color?: string, h?: string | undefined, w?: string | undefined }) => {
    return (
        <IconMessage stroke={2} color={color} height={h} width={w} />
    )
}

export const CaretRightIcon = ({ color="black", h=undefined, w=undefined } : { color?: string, h?: string | undefined, w?: string | undefined }) => {
    return (
        <IconCaretRight stroke={2} color={color} height={h} width={w} />
    )
}

export const CaretLeftIcon = ({ color="black", h=undefined, w=undefined } : { color?: string, h?: string | undefined, w?: string | undefined }) => {
    return (
        <IconCaretLeft stroke={2} color={color} height={h} width={w} />
    )
}

export const CaretUpIcon = ({ color="black", h=undefined, w=undefined } : { color?: string, h?: string | undefined, w?: string | undefined }) => {
    return (
        <IconCaretUp stroke={2} color={color} height={h} width={w} />
    )
}

export const CaretDownIcon = ({ color="black", h=undefined, w=undefined } : { color?: string, h?: string | undefined, w?: string | undefined }) => {
    return (
        <IconCaretDown stroke={2} color={color} height={h} width={w} />
    )
}

export const DotsIcon = ({ color="black", h=undefined, w=undefined } : { color?: string, h?: string | undefined, w?: string | undefined }) => {
    return (
        <IconDots stroke={2} color={color} height={h} width={w} />
    )
}

export const EditIcon = ({ color="black", h=undefined, w=undefined } : { color?: string, h?: string | undefined, w?: string | undefined }) => {
    return (
        <IconEdit stroke={2} color={color} height={h} width={w} />
    )
}

export const MinusIcon = ({ color="black", h=undefined, w=undefined } : { color?: string, h?: string | undefined, w?: string | undefined }) => {
    return (
        <IconMinus stroke={2} color={color} height={h} width={w} />
    )
}

export const PlusIcon = ({ color="black", h=undefined, w=undefined } : { color?: string, h?: string | undefined, w?: string | undefined }) => {
    return (
        <IconPlus stroke={2} color={color} height={h} width={w} />
    )
}

export const ReportIcon = ({ color="black", h=undefined, w=undefined } : { color?: string, h?: string | undefined, w?: string | undefined }) => {
    return (
        <IconReport stroke={2} color={color} height={h} width={w} />
    )
}

export const CheckIcon = ({ color="black", h=undefined, w=undefined, stroke=2 } : { color?: string, h?: string | undefined, w?: string | undefined, stroke?: number | undefined }) => {
    return (
        <IconCheck stroke={stroke} color={color} height={h} width={w} />
    )
}

export const ProgressSpinner = () => {
    return (
        <CircularProgress />
    )
}