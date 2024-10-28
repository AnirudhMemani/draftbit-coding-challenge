import { Prisma } from "@prisma/client";
import { TUnitEnum } from "../schema/component.schema";
import { TComponentDetails } from "../types/component.types";

export class MarginPaddingResponseDTO {
    marginTop!: { value: Prisma.Decimal | null; unit: TUnitEnum | null };
    marginBottom!: { value: Prisma.Decimal | null; unit: TUnitEnum | null };
    marginLeft!: { value: Prisma.Decimal | null; unit: TUnitEnum | null };
    marginRight!: { value: Prisma.Decimal | null; unit: TUnitEnum | null };
    paddingTop!: { value: Prisma.Decimal | null; unit: TUnitEnum | null };
    paddingBottom!: { value: Prisma.Decimal | null; unit: TUnitEnum | null };
    paddingLeft!: { value: Prisma.Decimal | null; unit: TUnitEnum | null };
    paddingRight!: { value: Prisma.Decimal | null; unit: TUnitEnum | null };

    static toResponse(marginPaddingDetails: TComponentDetails): MarginPaddingResponseDTO {
        const marginPaddingResponseDTO = new MarginPaddingResponseDTO();

        marginPaddingResponseDTO.marginTop = {
            value: marginPaddingDetails.props.marginAndPadding.marginTop,
            unit: marginPaddingDetails.props.marginAndPadding.marginTopUnit,
        };
        marginPaddingResponseDTO.marginBottom = {
            value: marginPaddingDetails.props.marginAndPadding.marginBottom,
            unit: marginPaddingDetails.props.marginAndPadding.marginBottomUnit,
        };
        marginPaddingResponseDTO.marginLeft = {
            value: marginPaddingDetails.props.marginAndPadding.marginLeft,
            unit: marginPaddingDetails.props.marginAndPadding.marginLeftUnit,
        };
        marginPaddingResponseDTO.marginRight = {
            value: marginPaddingDetails.props.marginAndPadding.marginRight,
            unit: marginPaddingDetails.props.marginAndPadding.marginRightUnit,
        };
        marginPaddingResponseDTO.paddingTop = {
            value: marginPaddingDetails.props.marginAndPadding.paddingTop,
            unit: marginPaddingDetails.props.marginAndPadding.paddingTopUnit,
        };
        marginPaddingResponseDTO.paddingBottom = {
            value: marginPaddingDetails.props.marginAndPadding.paddingBottom,
            unit: marginPaddingDetails.props.marginAndPadding.paddingBottomUnit,
        };
        marginPaddingResponseDTO.paddingLeft = {
            value: marginPaddingDetails.props.marginAndPadding.paddingLeft,
            unit: marginPaddingDetails.props.marginAndPadding.paddingLeftUnit,
        };
        marginPaddingResponseDTO.paddingRight = {
            value: marginPaddingDetails.props.marginAndPadding.paddingRight,
            unit: marginPaddingDetails.props.marginAndPadding.paddingRightUnit,
        };

        return marginPaddingResponseDTO;
    }
}
