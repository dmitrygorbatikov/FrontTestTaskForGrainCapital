import {FC} from "react";
import {Skeleton, Typography} from "@mui/material";

const SkeletonTableComponent: FC = () => {
    return (
        <>
            {[1,2,3,4,5].map((item) => (
                <Typography key={`skeleton-${item}`} component="div" variant="h1">
                    <Skeleton />
                </Typography>
            ))}
        </>
    )
}

export default SkeletonTableComponent