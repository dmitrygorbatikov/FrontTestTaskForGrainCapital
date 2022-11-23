import {FC} from "react";
import {Box, Skeleton, Typography} from "@mui/material";

interface ISkeletonItemComponentProps {
    width: number
    count: number
}

const SkeletonItemComponent: FC<ISkeletonItemComponentProps> = (props) => {
    const {count, width} = props
    const array: number[] = []
    for (let i = 0; i < count; i++) {
        array.push(i)
    }
    return (
        <>
            {array.map((item) => (
                <Box key={`skeleton${item}`} sx={{width}} >
                    <Typography variant={'h4'}>
                        <Skeleton/>
                    </Typography>
                </Box>
            ))}
        </>
    )
}

export default SkeletonItemComponent