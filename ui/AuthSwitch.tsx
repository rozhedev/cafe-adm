import React, { FC } from "react";
import Link from "next/link";

type AuthSwitchProps = {
    ctaLabel: string;
    authLabel: string;
    route: string;
};
export const AuthSwitch: FC<AuthSwitchProps> = ({ ctaLabel, authLabel, route }) => {
    return (
        <span className="block mt-4 text-center">
            {ctaLabel}{" "}
            <Link
                href={route}
                className="underline font-semibold cursor-pointer"
            >
                {authLabel}
            </Link>
        </span>
    );
};
