import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/ui/Icons";
import type { Route } from "../types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { MapsService } from "../services/maps.service";
import { useMemo } from "react";

interface RouteCardProps {
  route: Route;
  isSelected?: boolean;
  onClick?: (selectedRoute: Route | null) => void;
  compact?: boolean;
}

/**
 * 
 * @param param0 {
    "id": "6738078b27f88715156539bd",
    "name": "São Paulo, State of São Paulo, Brazil - Rio de Janeiro, State of Rio de Janeiro, Brazil",
    "created_at": "2024-11-16T02:46:35.026Z",
    "updated_at": "2024-11-16T02:46:35.026Z",
    "distance": 446263,
    "duration": 20315,
    "directions": {
        "geocoded_waypoints": [
            {
                "geocoder_status": "OK",
                "place_id": "ChIJ0WGkg4FEzpQRrlsz_whLqZs",
                "types": [
                    "locality",
                    "political"
                ]
            },
            {
                "geocoder_status": "OK",
                "place_id": "ChIJW6AIkVXemwARTtIvZ2xC3FA",
                "types": [
                    "locality",
                    "political"
                ]
            }
        ],
        "routes": [
            {
                "bounds": {
                    "northeast": {
                        "lat": -22.4495812,
                        "lng": -43.1683384
                    },
                    "southwest": {
                        "lat": -23.5557715,
                        "lng": -46.6395569
                    }
                },
                "copyrights": "Map data ©2024 Google",
                "legs": [
                    {
                        "distance": {
                            "text": "446 km",
                            "value": 446263
                        },
                        "duration": {
                            "text": "5 hours 39 mins",
                            "value": 20315
                        },
                        "end_address": "Rio de Janeiro, State of Rio de Janeiro, Brazil",
                        "end_location": {
                            "lat": -22.9068576,
                            "lng": -43.1729362
                        },
                        "start_address": "São Paulo, State of São Paulo, Brazil",
                        "start_location": {
                            "lat": -23.5557715,
                            "lng": -46.6395569
                        },
                        "steps": [
                            {
                                "distance": {
                                    "text": "0.4 km",
                                    "value": 392
                                },
                                "duration": {
                                    "text": "1 min",
                                    "value": 64
                                },
                                "end_location": {
                                    "lat": -23.5526239,
                                    "lng": -46.6378316
                                },
                                "html_instructions": "Head <b>northeast</b> on <b>Av. Brigadeiro Luís Antônio</b>/<wbr/><b>Praça Pérola Byington</b> toward <b>Rua Jaceguai</b><div style=\"font-size:0.9em\">Continue to follow Av. Brigadeiro Luís Antônio</div><div style=\"font-size:0.9em\">Pass by Relojoaria Topo e otica (on the left)</div>",
                                "polyline": {
                                    "points": "pvwnCfht{GGEUI_Ac@iAi@u@YYOw@_@u@]IEe@Sk@WGCIC]OAAUKc@SYOUKWK"
                                },
                                "start_location": {
                                    "lat": -23.5557715,
                                    "lng": -46.6395569
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "0.3 km",
                                    "value": 265
                                },
                                "duration": {
                                    "text": "1 min",
                                    "value": 66
                                },
                                "end_location": {
                                    "lat": -23.5518717,
                                    "lng": -46.635425
                                },
                                "html_instructions": "Slight <b>right</b> onto <b>Viaduto Dona Paulina</b>",
                                "maneuver": "turn-slight-right",
                                "polyline": {
                                    "points": "zbwnCl}s{GICIC?QAI?GCKCQEUESESKi@AGIc@AEUaAO_Ae@{B"
                                },
                                "start_location": {
                                    "lat": -23.5526239,
                                    "lng": -46.6378316
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "84 m",
                                    "value": 84
                                },
                                "duration": {
                                    "text": "1 min",
                                    "value": 24
                                },
                                "end_location": {
                                    "lat": -23.5511615,
                                    "lng": -46.63549099999999
                                },
                                "html_instructions": "Turn <b>left</b> onto <b>Praça Dr. João Mendes</b>",
                                "maneuver": "turn-left",
                                "polyline": {
                                    "points": "d~vnCjns{GYAo@CQAG?I?G@C@G@CBCDCD"
                                },
                                "start_location": {
                                    "lat": -23.5518717,
                                    "lng": -46.635425
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "0.4 km",
                                    "value": 360
                                },
                                "duration": {
                                    "text": "1 min",
                                    "value": 75
                                },
                                "end_location": {
                                    "lat": -23.5495111,
                                    "lng": -46.6384688
                                },
                                "html_instructions": "Continue straight onto <b>R. Riachuelo</b><div style=\"font-size:0.9em\">Pass by Ministério Público do Estado de São Paulo (on the left)</div>",
                                "maneuver": "straight",
                                "polyline": {
                                    "points": "vyvnCxns{GiBxFgAzCYr@MZGNEFIJOL]Xi@`@"
                                },
                                "start_location": {
                                    "lat": -23.5511615,
                                    "lng": -46.63549099999999
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "0.2 km",
                                    "value": 180
                                },
                                "duration": {
                                    "text": "1 min",
                                    "value": 20
                                },
                                "end_location": {
                                    "lat": -23.5480828,
                                    "lng": -46.638209
                                },
                                "html_instructions": "Continue onto <b>Pça. da Bandeira</b>",
                                "polyline": {
                                    "points": "lovnClat{Ga@XMFC@K@IBK@I?G@Q@C?K?CAGAGAUKm@e@YUSMMG"
                                },
                                "start_location": {
                                    "lat": -23.5495111,
                                    "lng": -46.6384688
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "0.2 km",
                                    "value": 167
                                },
                                "duration": {
                                    "text": "1 min",
                                    "value": 13
                                },
                                "end_location": {
                                    "lat": -23.5467083,
                                    "lng": -46.6375645
                                },
                                "html_instructions": "Slight <b>left</b> to stay on <b>Pça. da Bandeira</b>",
                                "maneuver": "turn-slight-left",
                                "polyline": {
                                    "points": "nfvnCx_t{GSEEAKEUIGAAAIAUEIAYQa@Uc@QWKi@U"
                                },
                                "start_location": {
                                    "lat": -23.5480828,
                                    "lng": -46.638209
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "2.4 km",
                                    "value": 2365
                                },
                                "duration": {
                                    "text": "5 mins",
                                    "value": 273
                                },
                                "end_location": {
                                    "lat": -23.5266276,
                                    "lng": -46.6310236
                                },
                                "html_instructions": "Merge onto <b>Corredor Norte-Sul</b>",
                                "maneuver": "merge",
                                "polyline": {
                                    "points": "|}unCv{s{GOGMIm@]UOIEIEMIMIWO{@g@]S{@g@wCcByA{@]SQKKG]Wk@]OKGCOIKGq@]c@SwBaASK_Ac@UMi@QMCKCMCQCk@Es@GOAA?iCOaAE_AEiAGy@Ck@Ec@COAeAGe@CQAy@Eg@CKAQ?M?_@?e@BI?KAM?MAK?IAOCQCYCIAQEi@IYGUEYEe@K_AOUEoAWA?cASKC_ASm@OcAUYE{A[eDs@GAo@KKCw@OOEuFiAsAYe@MkBSaAIk@EMA}@Me@Gk@I"
                                },
                                "start_location": {
                                    "lat": -23.5467083,
                                    "lng": -46.6375645
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "0.3 km",
                                    "value": 257
                                },
                                "duration": {
                                    "text": "1 min",
                                    "value": 78
                                },
                                "end_location": {
                                    "lat": -23.5243692,
                                    "lng": -46.6305742
                                },
                                "html_instructions": "Slight <b>right</b> onto <b>Praça Armênia</b>/<wbr/><b>Av. Santos Dumont</b> (signs for <b>Zona Leste</b>/<wbr/><b>Rod. Tietê</b>)",
                                "maneuver": "turn-slight-right",
                                "polyline": {
                                    "points": "l`rnCzrr{GQIKEICCAC?EAi@K_@Ee@GgBMOCeAGeAIE?C?OC"
                                },
                                "start_location": {
                                    "lat": -23.5266276,
                                    "lng": -46.6310236
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "0.3 km",
                                    "value": 284
                                },
                                "duration": {
                                    "text": "1 min",
                                    "value": 38
                                },
                                "end_location": {
                                    "lat": -23.5218493,
                                    "lng": -46.6301521
                                },
                                "html_instructions": "Continue onto <b>Av. Santos Dumont</b>",
                                "polyline": {
                                    "points": "hrqnC`pr{GOAMAu@KuAOuAOe@E_@C]Ec@Eu@Ey@G"
                                },
                                "start_location": {
                                    "lat": -23.5243692,
                                    "lng": -46.6305742
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "64 m",
                                    "value": 64
                                },
                                "duration": {
                                    "text": "1 min",
                                    "value": 7
                                },
                                "end_location": {
                                    "lat": -23.5212822,
                                    "lng": -46.6300713
                                },
                                "html_instructions": "Continue onto <b>Praça Bento de Camargo Barros</b>",
                                "polyline": {
                                    "points": "pbqnClmr{GG?KAIAE?AAYAKAe@E"
                                },
                                "start_location": {
                                    "lat": -23.5218493,
                                    "lng": -46.6301521
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "0.5 km",
                                    "value": 481
                                },
                                "duration": {
                                    "text": "1 min",
                                    "value": 41
                                },
                                "end_location": {
                                    "lat": -23.5197218,
                                    "lng": -46.6263405
                                },
                                "html_instructions": "Take the ramp on the <b>left</b> to <b>Penha</b>/<wbr/><b>Aerop. Guarulhos</b>/<wbr/><b>SP-70</b>/<wbr/><b>Ayrton Senna</b>",
                                "maneuver": "ramp-left",
                                "polyline": {
                                    "points": "~~pnC|lr{GU?SCKAGAICICGGECGISc@EIAEEIACCECECCCCIGGEIEKEi@SGCECIEIGGGGIIICGEKCMCKAMAM?I?E?KBuABkA@cA?KBaB?Q?K?Q?GE["
                                },
                                "start_location": {
                                    "lat": -23.5212822,
                                    "lng": -46.6300713
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "3.7 km",
                                    "value": 3670
                                },
                                "duration": {
                                    "text": "4 mins",
                                    "value": 232
                                },
                                "end_location": {
                                    "lat": -23.5299337,
                                    "lng": -46.5944297
                                },
                                "html_instructions": "Merge onto <b>BR-116</b>",
                                "maneuver": "merge",
                                "polyline": {
                                    "points": "fupnCruq{G@o@NyEDsABu@BeA@_@?W?a@Aa@Ag@Ce@Ca@Gs@Iq@Gk@e@uDUmBGg@Gg@Ce@AWA[Ak@?q@@o@@k@B]Di@Da@Ju@Fa@Jg@T{@Rm@Rm@LYJWN[DGHQJQPY\\g@v@iAd@q@tC}D?AHKhA{ANUf@q@DGNST[LQ\\e@@CJODKDIDIFKHON_@FQDKDMHWDONg@TaAPeABIF[FWR{AJ}@Bc@@e@Bi@@c@Ac@?g@Cc@CUCa@Ci@I{@E[QmAS{AKWIk@Ky@?AAUAGASAEAUCa@A_@?K?i@?a@@[@]@YBYB[LaAFc@Lw@Jc@Nm@Pk@J]N]JWFQVg@Vg@LQJQNUdAuA`B{BnCwDzAsBPUf@q@hA{A\\e@bB}BtBsCjA_BFKt@aAZc@P]FINW^_A^_AHQLa@L]"
                                },
                                "start_location": {
                                    "lat": -23.5197218,
                                    "lng": -46.6263405
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "6.2 km",
                                    "value": 6162
                                },
                                "duration": {
                                    "text": "6 mins",
                                    "value": 346
                                },
                                "end_location": {
                                    "lat": -23.5073741,
                                    "lng": -46.54903239999999
                                },
                                "html_instructions": "Keep <b>right</b> to continue on <b>Marginal Tietê</b><div style=\"font-size:0.9em\">Parts of this road may be closed at certain times or days</div>",
                                "maneuver": "keep-right",
                                "polyline": {
                                    "points": "`urnCdnk{GJ]Po@BILq@Hk@BW@G@G@OBMBWB[@[B_@B{@?c@?]A_ACu@Em@G}@iAkHIa@EYYgBoAuHOeAYoBe@aCEQMw@UsAO{@YeBc@mCYeBw@{EYiBa@eCGi@W}Ay@}EM}@]uBUsAKu@CYEWEo@Ek@AYCcA?cA@}AF}AFoAFaAR}DBi@@m@?o@Ai@?CAi@AUAYC_@K{@EYKm@Q{@COOu@Q{@U_AAEW_A[gAk@yAUi@GOu@_BMYa@}@y@iBi@mAQ_@Uq@MYGUKa@GWKc@WyAO_AE_@Gk@C_@GaAC{@?[?_@A_@@i@@[?e@@SDgCDaA@_B?S?CAo@A]E_@KkAE_@EWKi@Qu@Qo@[{@GOGM_AoB}@qAi@m@GGOOII_@[a@]SOYQSOWOo@[k@UYKaAYa@Ko@K_@GYEYCg@Ek@Cs@A_A?_@@k@Fm@FkDd@sBZyBZcALq@Hs@Fc@BY?Q?]@{@DyB?S?I?m@EqAIYCs@IkAOu@Kq@Oo@Os@SUGo@Sm@W_@OSKk@]QKs@g@u@o@aA_Aa@g@m@y@_@o@Ua@MUMYKU[u@Qe@K[CI]kAEQAGEQCMKk@EWCWE[Ea@C]C_@Eo@Es@GgAKeB"
                                },
                                "start_location": {
                                    "lat": -23.5299337,
                                    "lng": -46.5944297
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "5.3 km",
                                    "value": 5328
                                },
                                "duration": {
                                    "text": "4 mins",
                                    "value": 216
                                },
                                "end_location": {
                                    "lat": -23.4851313,
                                    "lng": -46.5058741
                                },
                                "html_instructions": "Continue onto <b>Rod. Ayrton Senna</b>",
                                "polyline": {
                                    "points": "`hnnClrb{GGoAAQOeCG{@?EEa@Gw@K{@CS?CC]Ko@SiAAAQu@K_@K]Mc@EKK[]_Ae@aA_@u@GKOWKSQ[KQ]g@e@s@u@}@o@u@][UUmEiEaA_A[YmBkBeBaBqAoA[YY[[YaFyEiBgBe@e@kBeBYY][wCgD[e@Q[O[OYMYSg@EIIUOg@GQESI]IYMm@Ga@Ik@Gu@E_@Ce@E{@AeAAc@?KA_@CmGCgD?g@CiCAmCG_H?WA}B?gAAy@AaAAc@Ci@Eq@Gu@Ik@CWMq@EQIc@g@wBAEq@oCc@eBiAiEGQKe@IWeB_HqAiFi@sBAGa@aBeAcEMc@Kc@Og@K_@s@cCEK]cA_@_AYs@w@cBi@cAU_@y@qAu@iASWwAgBaAeAqAoAeBuAsCoBqEsCeFaDCCGEKGoBmASMu@_@e@U"
                                },
                                "start_location": {
                                    "lat": -23.5073741,
                                    "lng": -46.54903239999999
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "27.5 km",
                                    "value": 27497
                                },
                                "duration": {
                                    "text": "20 mins",
                                    "value": 1170
                                },
                                "end_location": {
                                    "lat": -23.4418933,
                                    "lng": -46.2615883
                                },
                                "html_instructions": "Keep <b>left</b> to continue on <b>Rod. Ayrton Senna</b>/<wbr/><b>Rod. dos Trabalhadores</b><div style=\"font-size:0.9em\">Toll road</div>",
                                "maneuver": "keep-left",
                                "polyline": {
                                    "points": "`}inCtdzzGeC{AaBeA]UECWOOKg@[a@WYS_@U_@WOI]Ww@g@UOu@a@sBqAuBwAcAq@cBiAi@_@}ByAq@c@cAm@OKOMMIOIQKICa@SUYKIc@[qD}BUMSMwCkBsBeBsAyAwAuBEIKSEGy@wBa@_BSiAGYKi@Cg@?S?ACKEQEOCSCOCMAQAKCc@?k@?Q@_@BYBWFa@Ha@Je@PcBDm@h@kGHiAFk@BUXkC\\gDJ{ADs@FiBBaA?}CCyBW_GMwEKoDMcDCk@EcAAo@?s@@m@?A@q@Dw@FeA@ERgBDc@Hi@?EDYBKBOVmARq@ZcA^_AJWN]LWLUhKeNhDeFlEoGjAqBpBuDn@wAb@cAZy@DIf@uA^gANe@Tu@Pk@Ru@VcATcAJe@Li@F]Hc@F]Ji@Hg@Jq@Fe@LaA@CBQ@KJgA@QFu@JeBBs@Dq@@o@@[Bs@@s@@m@?eA@k@AcA?o@CcBE{AAa@EaAImAKuAWiCIw@[oCIy@E_@?E?MiAuKUcCeAaJGSAOGk@[oC]_Dy@yHkA_LYeCSaBGg@Kw@Ms@QcASeAe@sBYaAg@_BEOk@_B}@aCYs@IOCGACq@qAaAgB_@m@u@iAu@gAg@q@s@y@cAmAu@w@oAkAe@a@WUWSc@_@s@i@i@]wA_A_@YeBcAy@i@c@Yg@]i@]]U{@i@o@c@MICAIGm@e@]YGGy@w@[[WY?A[]w@gAW_@Wa@a@u@i@gAg@sA]cAMa@Mc@Me@Kk@Ms@Mw@Kq@Ee@Gm@AUC_@A[A]AW?EA_AA_@?I?Q?_B@qA@a@BkF?]BsDBaBB_FB}E?U?U?Q?UAeAAmACy@?EAg@ACC_AEaAQkDMyBOwBIeBEcAC}@AW?a@?m@@e@Bi@@g@F{@Dm@PiBPiBzAqOlBgRrA}MPiB?C@MVkC@O@KBU?ABSHo@BULeAHw@@OBWNyAJ_D@_A?oBEaBIuAK{AIi@E[Kw@Ie@WuAKi@Mm@CSs@{Cg@_C}AgHsE{Se@wBGWuAcHsAyGi@gDc@oCi@kE]sCGq@UsCWuDc@sJC_A?YE{BAoE@wEJcHPsFZoFVuDFs@Hm@Fu@PqANiAD]BUt@mFj@cEHw@DYFc@Hk@h@aD`@cD\\{Bp@qET_CPsB@S@EJyB@K@KFcC@g@F}CCqGMiEM{BOeBa@mFAEAM?CG]AEOiAU}AIc@I_@Ia@CQGY]}AOm@Mi@Qo@]wA[cA[}@IYO_@?Ak@}Ai@qAO]a@cAGMg@iA{@eBMWe@{@U_@Wa@mAkBo@eAk@w@cAuAg@m@i@o@}@gAuAeBKKMMaAiAyAiBy@cAqAcBa@g@s@}@w@aA_@g@o@w@s@{@SWs@{@Y_@KKc@g@{FkHsAcBeAsA}AmBgByBOOU[o@w@}@iA_AkAcAqAwAgB]c@wAeBCEsDqE_CwCg@o@iAwAkAyAOSU[]g@IKcAuAWe@Ua@KOUc@Ua@m@oAm@oAg@mAc@eAa@iAc@qAg@cBUy@a@aBWkAS_AO_ASmAU}AOcA_@{C}@mHk@kEg@{Di@cEIo@S}Aa@}CESCYCYYwBS}AE[i@eEOiAy@eGk@qEWqBa@cDk@gEWqBIu@g@wDeAgIWwBSyAOoASqBSeCI{AEcAASGcBCe@Ai@Ak@?i@?SAi@?qA?U@i@@u@@{@BqAB]HmBLqCFaAHcBDq@HiBDs@HyAHaBBi@HcBDcA?O?W@aAC{A?UAUAUAWAIAUKiAIw@QoA[{AQu@Ss@Wy@So@Qg@Ma@EMISO_@_BuEEMWw@IUEO]eAMc@Sy@g@_CIi@G]Ii@Gi@Is@Is@Gy@IcACg@GeBAy@AaA?C?g@?]@_A@]Bi@?]FeA?GFs@Fy@Fq@Jw@D[Js@DWTuAHc@z@oDT_Ar@qCFUBKlA{EDW@C|@oDLg@DMJe@p@oCPq@VaAd@sBV}AXoBJuAFkA@[@m@?aAAuAKsBM}ACSc@_EKw@?AQiAa@{CGc@Ge@OkAg@}DWqBeAyHEY"
                                },
                                "start_location": {
                                    "lat": -23.4851313,
                                    "lng": -46.5058741
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "0.7 km",
                                    "value": 665
                                },
                                "duration": {
                                    "text": "1 min",
                                    "value": 24
                                },
                                "end_location": {
                                    "lat": -23.4405314,
                                    "lng": -46.255244
                                },
                                "html_instructions": "Keep <b>left</b> to continue on <b>Rod. Ayrton Senna</b>",
                                "maneuver": "keep-left",
                                "polyline": {
                                    "points": "xnanC|mjyGCSw@oGYaCsBkO?CKu@[aCUeBGa@"
                                },
                                "start_location": {
                                    "lat": -23.4418933,
                                    "lng": -46.2615883
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "6.1 km",
                                    "value": 6061
                                },
                                "duration": {
                                    "text": "4 mins",
                                    "value": 219
                                },
                                "end_location": {
                                    "lat": -23.4176555,
                                    "lng": -46.2020105
                                },
                                "html_instructions": "Keep <b>left</b> to stay on <b>Rod. Ayrton Senna</b><div style=\"font-size:0.9em\">Toll road</div>",
                                "maneuver": "keep-left",
                                "polyline": {
                                    "points": "hfanCffiyGsCiUg@}D_AqHAMAIKk@EY[eCo@wEGk@Kq@UiBGq@Kq@]mCEc@QqA_@_CSgAW}@U_Aw@uBo@yAiA{BsAmCc@}@aAsBcC_FmA_Cw@aBy@aBAC_@s@u@{Ao@qACEmByD}A_Dq@yAe@kAa@aAc@kAa@kAaA_D}@cDq@{BSq@g@aBc@yA_AaDo@wB[eAu@oCy@oC}@}Cc@yAaDwKGQIYa@uAkAcEy@qCi@kBw@kCGUIQCMs@eCCIKYCIgC}IAAAGMc@K[AGSo@[iA_A{COm@IWCKk@mBg@gBa@uASq@CIK[AGa@uAaBwF_@iASo@Ma@Wq@Qa@]{@o@wAq@sAQ][k@]k@e@u@w@kAk@w@iAwAo@w@mAyAGIs@}@wAcBqAaBOSMQKMKQk@{@c@w@IO"
                                },
                                "start_location": {
                                    "lat": -23.4405314,
                                    "lng": -46.255244
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "5.8 km",
                                    "value": 5827
                                },
                                "duration": {
                                    "text": "4 mins",
                                    "value": 221
                                },
                                "end_location": {
                                    "lat": -23.3863432,
                                    "lng": -46.1579763
                                },
                                "html_instructions": "Continue straight to stay on <b>Rod. Ayrton Senna</b><div style=\"font-size:0.9em\">Toll road</div>",
                                "maneuver": "straight",
                                "polyline": {
                                    "points": "jw|mCpy~xGEGACYk@IOIQs@cB]cAWw@Ok@Om@Mg@a@mBO}@UmAKo@[}AQeA[cBY{AY_Bc@sBAAKa@Qy@_@yAOk@Oi@k@kBc@qAo@mBi@sAi@qA_@y@i@oAq@sAo@mAo@kAYg@y@uACCw@oAu@gAg@q@e@o@_@e@QW[]y@cAOQ}@aAOSo@o@k@k@[[o@k@w@s@q@m@OK[Yq@i@eAu@eBmAmBqAo@_@{GgE}BwAc@Wa@YoAw@eAq@y@g@[SkBiAy@i@gAq@aAo@YQCAiAu@w@i@o@e@GCcAw@gAy@oAcAk@e@eA{@s@o@uAoAiBgBu@u@aBcBsB_C}CwDaDkEo@aACE_BcC_A}Au@oAm@eAUa@}A{C_AkB{@kBISEICCEIIW[s@g@qA_B}Dm@}AWo@c@gAWq@_C_G}A{DyAmDy@uBe@mAc@eA_A_CkByEaB}De@mA[y@O["
                                },
                                "start_location": {
                                    "lat": -23.4176555,
                                    "lng": -46.2020105
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "3.0 km",
                                    "value": 2992
                                },
                                "duration": {
                                    "text": "3 mins",
                                    "value": 175
                                },
                                "end_location": {
                                    "lat": -23.369766,
                                    "lng": -46.13521979999999
                                },
                                "html_instructions": "Keep <b>left</b> to stay on <b>Rod. Ayrton Senna</b><div style=\"font-size:0.9em\">Toll road</div>",
                                "maneuver": "keep-left",
                                "polyline": {
                                    "points": "rsvmCjfvxGo@oAo@wAUa@iAsCg@{A}@_Dq@iBu@eBGQq@yAUi@e@iAUm@GM_AcCOc@IOGQQa@Oa@IQGOEMWo@Ym@Yq@mAyCeA}Bg@_AiCkEkA}Aa@i@{@iAkE}EY[kAqAWYeDuD_EqEeCqCu@{@kAsAUYOOW[[]GGIK]]yAcBwA_Bw@{@}AgBsBaC}AeBgAoAWWs@w@w@_AuA{AiByBOQ"
                                },
                                "start_location": {
                                    "lat": -23.3863432,
                                    "lng": -46.1579763
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "65.9 km",
                                    "value": 65882
                                },
                                "duration": {
                                    "text": "40 mins",
                                    "value": 2426
                                },
                                "end_location": {
                                    "lat": -23.094124,
                                    "lng": -45.6164977
                                },
                                "html_instructions": "Continue onto <b>Rodovia Governador Carvalho Pinto</b><div style=\"font-size:0.9em\">Toll road</div>",
                                "polyline": {
                                    "points": "`lsmCbxqxGoAyAg@o@GKgB}Bq@y@c@k@]_@m@q@a@_@QM[Yi@a@y@k@cBcAeAo@[SYQUQWUQOQOc@e@EGKOMOSYQYQ_@MWIUIQISGUKY]qAEQ?AS}@EOESGUEOIYOc@O]Si@OYIQOW_@m@c@k@a@a@k@k@a@[}@w@eAw@k@g@e@_@USWWWWKMAAW[]a@W]S[U[U_@[i@Ue@Ua@Se@Qc@M]IWSo@M_@K[I[I]I_@K_@Ie@Mc@CMe@uB_@aB_@{AWmAe@sBQu@UaAMu@eBwH[uAMm@Mk@EWEYKo@E[CYE]AWC_@C]A[?QAO?[?W?[Bs@@g@@W@[BW@UBWBQDWD[BOBMDYFWFYXeANe@Ni@L]N]^aAd@gAf@oAHSDKRi@Pc@Pe@J[FUHYLc@H]H]Ji@He@D_@DYB[BUBWBU@]Dq@Bk@DmAFqADsABqADaAB_AFqC@MLoC?MFcB@]?CB_@DmBFwBDaA@k@Ds@B}@@aA@s@?c@?c@C_AA_@EaAIsAEo@Gq@K_AGk@Gc@OeAKk@SoAKk@Q_AQiACQKk@KeACWCSEa@Eu@Ca@Cq@Ai@?Q?KA[AU?aA?_@@k@@]Bo@Dy@Bi@L_BLyAF_AHy@Ba@B_@?GH_AJqAHw@Fw@@SBWF{@JoAH{@B_@?GHaAH_AHgAJiADo@H}@HmAFo@H}@Dw@H{@Dm@D]B[@OBi@Bq@By@@e@@}AAa@A[C_AEy@Em@Ek@MkAG_AC_@E_@KeAYcDMwAGm@Go@G{@Iq@I{@Ek@MyAMmA?AEc@AYKaAIeAE_@QmBS}BQsBEa@C[KoAUeCa@mEOiBMwAAIAI?ECS?GOsAGs@Im@E_@Ee@Ge@Ga@Ii@EYGa@I_@G]]gBQ}@[wAS{@K_@_@yAo@oBm@mBk@kBm@kBi@}Ag@cBYy@Og@w@cCg@}ASo@Um@IUMc@yBgHISGSKWEOIUaC_HUg@k@uAUg@Yk@M[GKyB{D_@q@u@gAMOa@o@u@kAwBeDwBaDaAwAkAiBc@s@c@q@[g@EESYc@o@Ye@eBkCmDkFgA}A{@sAuAyBmByC_@u@OUCI_@{@Ue@Qc@c@gAMa@?ASm@c@yA[sAIa@O}@[{BE}@?CCa@?C?AAKAUAMCoB@{@@_AFoAJuA@QVoBXoBh@eDTcBx@aFBo@tAyIHs@Hu@VoAd@iCHm@J}@Fs@Hu@@[@MH{@JsBL}D@aABkB@k@?KAg@As@Ay@GaAEy@Cc@OyAAEGo@AAAQSaB]mD_@aEAI?g@CSMaBCYAKCYAKIgAOkASkBSqBIoAKoBEgCBsCLqCFo@Hs@Hu@BODU?ANw@F_@d@qBNm@Rq@He@`@wBF_@RyAFc@Da@F{@FgBPyCBiAMiFEyAEq@Cu@Ck@Cy@Cc@Co@EcAM}DAu@?U?{@?E?M@S?C?I?C@y@FcADg@Fa@L}@Jk@\\cBd@iBv@}B|@aEBGRgARiA@CFe@PgA?CNyAF_B?G@g@?O?U?w@[qDm@_Dc@eBi@cBe@gAa@_AWo@Si@]y@sAkCQe@w@kB}@kEEUCUGa@CWCUCg@Ci@AC?GAMCi@Cm@?CAK?WAc@EsBEsBA]?MSyISwIC{@E{@Au@Cy@OiGAGUeHKuECq@OcGCYAa@C_@E}@]sEMyAOgAIc@Ic@WcBm@_Da@qBe@cDSiCCg@G}@EeC?gCDy@Bg@Bm@ZyD@K@K?ABOBa@BKDc@TeCDg@RyBD_@?IBKVeDBOBQLgBBa@BeABsA@cBAoAAw@MoBCo@QkBQqAQiAe@iCWsASy@Qe@gBgDqAeCwA_C}AyBmEkGYm@[s@_AwBo@uBk@cCUkAUgBK{@IiAG}AEcB?_B?k@FeDFqDA{AAcAE}@A[QsB]eCW_BUgAYmA[gAWs@K[Wq@g@mAe@aA}@_Bu@mAKMy@mAi@y@i@u@qAwBqA{BuA}CqA}CiAuCa@wAY{@Mg@K_@Uy@Sw@YaAQs@EMGSKe@GWqAsF{CwL[uAYmA[mAEQG[EMI]UcAeBcHMc@iAuEi@kBCIGQYu@s@cBg@eACG{@{Aa@q@_@e@o@}@s@}@e@g@OOYWm@k@k@e@gBwAkAcA}@u@o@e@WUKIAAMKsC}BkDoCcEiDg@a@GGIGw@m@cCoBsAgAq@k@KG}@u@}@u@uAiA_Ay@w@y@i@o@g@q@Wc@KOIMYi@Wk@[w@GOM]Y_ASw@SeAKq@S{Au@sGEc@]eCE[I]Os@Ou@Uw@Sq@Ka@CGQk@Wo@Se@]u@a@}@]m@o@gAs@eAg@q@s@{@_AcAu@s@eA}@m@c@}@q@wCkByBsAuCgB]We@YIG{DcCgAq@iBiA}@k@wA}@AAcAo@]Oe@Ym@c@m@c@QKs@c@g@[q@c@q@a@eAq@o@a@q@a@g@]a@Ui@]i@_@s@a@cAs@q@c@m@i@e@_@IIy@}@m@y@g@y@]q@EGa@aAg@_BOw@Q{@EYKeAIeAMwDCmD?MGuBAoBCq@?OA{@A}@Aa@Ac@?AAe@AeAAcAAQCyACsAIaBIcAUsBSiAQ{@W}@c@sA[u@KUKO]s@Q[Y_@U_@]k@c@m@sA{A{A}A{@}@g@g@i@k@m@o@{@_Aw@w@uAwA}BeC}HeIqAsAgAmAoBqBkCsCAAIGMOuHyH_@_@?AMK?AuF}FqBcCy@{A_B}BiA}AsCcEc@q@oBoCa@o@eA{AYk@Se@[g@O]Yc@]m@[e@i@{@a@o@s@q@{@gAs@u@YYMOSU[W}@gA{AqBwAuBW]W_@mAeB}AuBaCkD_AcBWg@_@}@Oc@KWEGIYEOe@kB]uBSyBGwBAq@?I?}@DiE?M?]BaE?U?cBAy@?qB?_@AK?OAqBCqAImBAAA]AGMoBM}AIw@AI?GEU?AE]QoAKw@UyASoASaAUiAQw@e@sAe@yA]cAGWQk@q@oBK[Ys@Yu@k@wAk@qA_@w@e@{@o@mAk@eAq@oAuAiC]k@EI_@o@aAkBaAmB]k@[o@a@s@qCkFkAwBSa@We@gAoB[o@k@kAg@gAUg@MW?A[w@Si@]gAUo@Ma@Oe@s@wCoA}FaBkHy@qDu@kD_@wAMq@UgAAGGa@Ia@YuAAASaAQy@UaA]{AYuAA]GWQq@e@sBg@_CQk@q@uC?ACIS{@[sA]yAScAU_AMk@Qw@Sy@Q{@a@mBa@cBMo@GQgAsDkAeDk@uAk@qA{@qBS_@g@_AGKg@_AiAkB[c@?AS]]g@_AiA{@gASYQQiAqAaBgBm@o@_DgD}CeD[[CCy@}@g@i@oAuAMMkBmBmBuBiBqBUUQSaBcBkAqAGGSUEE{CaDOQIISSWW{@aA}A_BgAiAiBiBaA{@qBeB_CiByC{BIGa@YkBkAgAq@oBiAqAw@eAm@w@e@]Qa@USMMIECsDwBwBoAgAo@sDuByD}BcDoBkDqB{A{@o@_@_Aq@o@]IEcAk@GCiDmBOIEEMIAAIGm@c@w@m@yAqAgB_B_A_AuAaBe@m@]c@y@gAAAMQGKCGsBcDy@qAo@_AiBoCk@_Aw@mA_@m@U]ACi@y@kB{C[c@S]y@sA[e@_AyAU]AAU]U]U]iAcBuBiDEIIMGIQWs@iAS[U]sAyB}AaCU]CCACmAkBeCaE[e@U_@eAaBkDqFAAEG{@yAo@_AgAcBc@s@q@iAQYeBgDsAgCeA}By@qB{AsDsAgDy@wBq@_Bu@mBw@qBm@{AoAaD}B{FyAuDuAkDeAkC}AaEa@cAiCsGeCmGkBqEQa@CEeAiCq@}ASc@Sa@}@cBa@s@Ye@u@mAwAwBwAkBeAmAkAsAsAoA]]eAaAyAmAaAw@{@k@gAs@aAk@eAm@w@_@aCkAeAa@mAg@qAe@wAe@oA]{Aa@{Bg@oCk@_Ds@eAUiE}@gGqAeE}@c@Kc@I_Ds@{Co@_Cm@iBi@aA]]KAAwAk@iB{@AAoBcAoAu@wA_AqAy@}AcAeDuBwCkBcC_Bq@c@k@]OKwFqDoCeByFqDa@UUOeC_BoD}BqCgByDcC_@WQOu@i@sAgAmAgAu@s@e@e@g@i@a@e@_AmAo@_Ag@w@s@iAk@cAEIiA}BkAmCm@}ASg@Uk@cAgCq@aB_AwB}AqDM[EMEKi@wAy@sBa@aAm@wA_@y@mGoOu@gBq@kB_@y@Sa@IQk@qAeAqBm@oAqA_CkAkBkBsCcEcFgEwECCaC_C[YkCyBOKKKqB}AsDcCwDwBMIEEaCwA}CmBeDqB_@UCAYQuD}BuD}BUMGEgEiCsBoA{AgAaBkAIGAAKI[UyAwAa@c@i@m@cCiC]_@aDcCWQi@a@WUg@a@uAuAk@o@wAkBqGcJgEsHiA{BeA_Cg@qACE]}@CG_@}@e@oAKY[u@a@oAa@qA{@uCk@sB_@yAo@qCSs@}@yDk@wBk@yBaAwD_@}Aw@aD{AiGEQEOeBeHKc@Kc@Me@kAyE[oAq@iCEOsAoFEMeAmEK]uBwI{@_DcA}CI[IQs@oBsB{EuBuE_BoCoBcDyEoGSYCCcCwCi@g@[[eCcCeB{A[WIG_A}@gDeCkD}BoBkAkAm@]QiCqAoB}@sBw@qGwBwHoB_IkB_@IWG{EeASEyA_@gAUIAEAa@Ii@MICuDy@qDu@YIe@Ia@K[GWIsDy@s@OsCq@MCsA[_Bo@uCaAyAk@SICAOIk@UcDgBaEmCkC{BKSsAqA[]eC{CGGaBeCkAsBg@_AmBwDkEmIuAqCIOCGKQoAgC_AmBISA?S_@KSkAwBMWi@gAMWAAmAeCWe@_B}CaAkBk@kAa@u@c@}@k@iAuCyF}A}CYg@Ue@_@g@Yq@EGCIISi@}AuAmEgBeGcBeEsB}D_CeDuEyFUWGKm@w@eA}AQY]m@IMGK_B}CACGKWm@A?}AmDi@gAyAuCaCyEOYcBiDc@{@Sa@S_@i@eAc@aA}@uB}@gCy@oCm@wBg@sBKk@"
                                },
                                "start_location": {
                                    "lat": -23.369766,
                                    "lng": -46.13521979999999
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "3.8 km",
                                    "value": 3776
                                },
                                "duration": {
                                    "text": "3 mins",
                                    "value": 154
                                },
                                "end_location": {
                                    "lat": -23.0636031,
                                    "lng": -45.6200199
                                },
                                "html_instructions": "Keep <b>left</b> to stay on <b>Rodovia Governador Carvalho Pinto</b>, follow signs for <b>Rio de Janerio</b>",
                                "maneuver": "keep-left",
                                "polyline": {
                                    "points": "fq}kCbnluGUqASkAMm@Gc@_@mBGYEUKe@EOEQGOIQISOUKQMMOOOMAAOMQMSKMGOGKCOGICIAKCMAIAIAWCO?W@O?QBO@WBUDMBWHKDMDa@NMFA?YLC@OFQFC@MBa@LaDjAqGbCi@Rm@PWHYHOBMBOBODQBUBUBWBM?U@S@U@Q?O?[?c@?c@Ak@Ao@AQ?c@Cm@?WA{@AO?Q?[?S@_@?Y@_@BWBUBa@DQDQBSDUFe@LSFWHKDMDUHUJOFUL[NOJMHSN[TUPUTiA|@g@`@]Vi@`@a@XUNOHULQHQJc@RUHSFSFUFg@Lc@Hk@Fc@Fa@BU@e@@y@?c@?qAEiCEaAE}ACm@A_@As@Ag@A_@A]?W?w@BS?S@WBSBc@FWD[FOBUFm@Pm@NKDi@NoA\\q@Ra@LgBb@{@Xk@Ny@Vk@N[Jc@LcAXo@Pc@LiBd@{@TWFYDUD_@FWDYBa@Ba@@W@Y@Y?]?UAk@Ak@Ck@Ei@Es@Gk@E]EsAI"
                                },
                                "start_location": {
                                    "lat": -23.094124,
                                    "lng": -45.6164977
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "0.5 km",
                                    "value": 467
                                },
                                "duration": {
                                    "text": "1 min",
                                    "value": 25
                                },
                                "end_location": {
                                    "lat": -23.0597689,
                                    "lng": -45.6183692
                                },
                                "html_instructions": "Take the ramp to <b>Taubaté</b>/<wbr/><b>Aparecida</b>/<wbr/><b>Rio de Janeiro</b>",
                                "maneuver": "ramp-right",
                                "polyline": {
                                    "points": "nrwkCbdmuGIICAEAKAKAi@Es@KIAYEc@Gm@IWGEASEEAAAKCYIk@Ya@S_@WUSMKOMQO[WWQSIQIYGo@Ma@Gc@I"
                                },
                                "start_location": {
                                    "lat": -23.0636031,
                                    "lng": -45.6200199
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "35.3 km",
                                    "value": 35300
                                },
                                "duration": {
                                    "text": "25 mins",
                                    "value": 1506
                                },
                                "end_location": {
                                    "lat": -22.9084681,
                                    "lng": -45.3175039
                                },
                                "html_instructions": "Keep <b>left</b> and merge onto <b>BR-116</b><div style=\"font-size:0.9em\">Toll road</div>",
                                "maneuver": "keep-left",
                                "polyline": {
                                    "points": "pzvkCxyluGQFK?UAWE_@KYKYMAAWMYS[UWWW]KOYYkD}HGIOI{DwJwBoFkCwGs@eBOc@o@_BKWKWwAmDAEKYACQa@Oc@q@_BwAuDAAgAqCy@yBEIIWEKUk@m@_Bc@iAWs@EMe@oAu@}BK[w@eCw@sBc@yAc@yAq@sBu@aCEOCIAACKi@}Bm@aCcAkE_AsDEKiA_FWiAq@_DgAuFi@yCG_@CIEWG_@Ga@I_@Ga@s@uEwAsIyA{Ii@iDi@gDo@mEk@_DQ_A?C{@uFaByKMm@Km@W{AW{Ay@qEEMKo@O{@M}@WwAOeAY_B}AqJw@wDgBwKIe@e@uCkAoH[gBCOCOU{AeA}GEO?EESCK_@_CCOc@}BUeAEOS_AU}@I_@Oo@K]Oo@K_@Mg@K]I[K[GQOe@Oe@Oc@K]MY?AO_@Qa@Oa@Qa@Qa@Q_@a@}@IWIUQa@IUO_@Wo@QYM[CIEGIQm@kAcAoBAAcB}CoDcG_AwAyCuEYe@iDoFGI}BqDsAsBKO_AwAKOiBoCmAiBkCgEs@kAeDaFQYeAcBsAsB_BaCqB{CqFsIMU}EwHq@cAo@iAsAsB}@{AsCgE[g@_@q@OUMQKQIOMQEGMOkAkBSYqB}CU_@CEk@_AiAgBkBiCuA}B_@k@We@a@m@eA}AyA}BWa@MQQYCEMQIO]i@mAkBqAsBc@m@}@wAsD{FyCuEmB{CKOIMKO[e@_CsDS[GKMS]g@aD{EOUCEIKKQAC{@uA[i@qAyBeAkBiBgDGKaBgDUe@MWQa@i@kAq@yAq@_BCGQa@q@eB{AuD]}@Wq@eAgCcAiC_B_Es@cBaAgCk@uAm@{AwAoD{@sBO_@Ws@eAkC_E{Je@oA{@uBu@iBuAkDkAuCQe@qE_Lm@{A_A{BACM]CCuBkFAC_@_AQa@AEm@yAcHqQ{@wByAmDgBwE}@uBM[AEcAiCcBcESk@Qc@?AuAgDsGaP?CuBcFwAoDs@mB{A_EaBuDy@{B}@_Cw@cBi@yA}AuDmC_HuBiFsBiFeAgCmB}EwBkFm@wAyAsDs@kBqBuEsBcFOc@q@eBgBmE?Am@wAk@yA{@oBUi@Qa@Qa@oA_D}CwHgBmEOa@gBmEkCeHMY_@}@a@}@yCmHQa@kCoG[_AGMACGS}BuFO_@ACQa@KWq@{AGQiB_Fw@gBQc@mB}EQa@yCuHOa@uBmFSc@KUEK}AyDiB}Es@eBgAoC[o@AEIOAEKUQa@c@eAk@wAy@mBk@yA]w@i@yAg@oAa@gA}@wBg@mAm@{ASk@oA_Dy@oBQe@Qa@Oa@mBwE[y@iAqCkDuIsBgFy@sB[w@A?Oa@Qc@mB{EYs@Qa@kAsC[y@Sk@aAaCa@_AcAkCgBiEg@qAm@_BGM?AGOuA}DaK_WgNi]uBiF{ByFyBkF_@aA{D_J{@uBuAiD}D_KA?uAiDM[e@kAeFiM_BaEa@cA]y@mC{GQa@IU}AwDuBmFcCaGcAiCiBsEuBiF_B_EaA_CyAsDuAkDu@iBkCuGsAeD[y@k@yAs@gBmAyCaAiCKUCICIeFiMmAwCKQcJ_UcFiMy@wBSg@a@aAq@eBwAqDqCkHsAcDo@aBqB}Em@sBg@mBUy@[_AGOi@oA_@s@gB{Cg@_Ac@aA{@uBCEy@oBi@{Ak@yAwBsFyBsFm@{ACEi@uAOa@Oa@s@gBu@gByCiI_IuRsAuCuBeFWu@Yu@K[qB{EO]mCuG}IuTOc@Qa@Qa@yGqP[u@gAmC_@aAe@kAc@cA]w@]{@_AcCQe@Wq@Sa@Uk@KUQa@_@y@Ws@c@cAYq@[w@Sm@Uk@Yq@Sg@_@gA_@_Ag@mAWm@Yu@Uk@Ui@Se@Sg@Ym@K[KWa@_Aa@eA]w@_@cAe@eAcAkCgAkC{@uBc@iAwCkHq@aBq@_BYw@GOMWg@qAISGOIQISQc@"
                                },
                                "start_location": {
                                    "lat": -23.0597689,
                                    "lng": -45.6183692
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "1.1 km",
                                    "value": 1144
                                },
                                "duration": {
                                    "text": "1 min",
                                    "value": 47
                                },
                                "end_location": {
                                    "lat": -22.903279,
                                    "lng": -45.3078729
                                },
                                "html_instructions": "Keep <b>left</b> to stay on <b>BR-116</b>",
                                "maneuver": "keep-left",
                                "polyline": {
                                    "points": "|hyjCjarsGSe@Wq@O_@eAqC]w@IUUo@k@oAO]g@oA?AUk@Si@[w@M[i@oASe@Qa@Q]Yw@Oa@M_@Ue@Sg@Uk@Se@k@oAk@kAm@qAk@kA]m@Sa@GMO]Q[O[uAeCQ[Yg@GK"
                                },
                                "start_location": {
                                    "lat": -22.9084681,
                                    "lng": -45.3175039
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "5.9 km",
                                    "value": 5893
                                },
                                "duration": {
                                    "text": "4 mins",
                                    "value": 241
                                },
                                "end_location": {
                                    "lat": -22.874821,
                                    "lng": -45.260555
                                },
                                "html_instructions": "Keep <b>left</b> to stay on <b>BR-116</b>",
                                "maneuver": "keep-left",
                                "polyline": {
                                    "points": "nhxjCdepsGKOi@y@mBcDeBkCq@mAS]w@sAgAiBgAcBIMc@w@u@iAe@y@eAeBc@q@c@u@k@cAQWOYi@y@yAcCwAaCOU[k@e@s@s@gAk@cAiFmIgFwIWe@MQIOIOsDeGq@iAm@}@}BuDc@u@oAoBs@mA_A}Ag@y@QWOUcAcBcC}DS]oBaDwAcCeBqCuA{B}AeCA?gAmBeAcBo@cA_AuAaB_Cm@{@UYi@u@cByByAoBi@q@e@m@aBmBQSQUcAiAaC_DwBqCmCmDeAsAW]k@s@{BuCaCaDu@_Ac@m@OUAAU[?AEEgAgB[m@Wi@]u@i@qA_@cA]aA]kAOq@WgAMu@_@uBWsBGy@_@{EM}AqAmP?C[mEQkCCa@YeE"
                                },
                                "start_location": {
                                    "lat": -22.903279,
                                    "lng": -45.3078729
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "18.3 km",
                                    "value": 18309
                                },
                                "duration": {
                                    "text": "13 mins",
                                    "value": 773
                                },
                                "end_location": {
                                    "lat": -22.7721119,
                                    "lng": -45.1346666
                                },
                                "html_instructions": "Keep <b>left</b> to stay on <b>BR-116</b>",
                                "maneuver": "keep-left",
                                "polyline": {
                                    "points": "rvrjCn}fsG_@_FImAk@sHGq@Ca@AKCWAKIu@MsAIy@[wBwAcJ[gBYeBqBqLkAsHy@wEe@mBe@kAe@gAa@_AMUCECEGKCGCCEGy@oAw@aAsAoAGGGGCCEEQMIIaAq@aEgCsCgB_@UYUYUo@k@w@{@m@w@[g@S[yAqCOWS_@?A}AuCEKq@kAa@q@Yc@k@w@u@u@qD}CeDuCiB}AoC_CwDcD}BqBSUWU{AqAi@g@g@e@AAaA_AiA{@iBaB{AoAsE}DIIMIgBaB}AqAyAmAe@[w@c@mAk@MEgAg@e@UMGgEoB_EeBCAOGMGOGOEOEOCOCOCQAYC_@AQAcADc@Be@DoAHu@Fq@@a@@a@@UAOASASC_@EOEYG[IECKCOG]OWKo@_@oAw@w@i@uAeAu@g@oByAmAy@[Q]QUIIEEC]I]K]I[I_@GWGyCe@{AWyCc@aBUSEe@KSEc@MSGQGQGQIQGCAMGQIQIMIA?QKOIOKQKOKOKOKOMOMMKOMMMMOOMMOY]{CaEa@k@a@i@Y_@Sa@s@_Ao@}@e@o@_AqA_BwBoBoCSW{@iAaAuAGGMQi@u@s@_A]e@_@g@QWgA{Ai@q@_@i@g@q@]g@IKKQWc@Q[O[]y@EOSi@e@sA{@gC]_A]_A[aAUo@K]M[Yy@IUEMe@qAYy@Oa@yBmGOe@gCkHEQEOGOEQGOGOCGCGIOGMGOKMGOIMKOIMIMKKIMKMKKKMMKKKKKMKMIKKMIMIMIKGAAOIMGMIKEEAcLmFKGKGKGKGKGIIKIIGIIKIIKIIGKIIGKIKOWGKMYGMKY_A_Do@iCEWESE[AECWAY?g@?S?Q?O@K@S@S@OBQBOBQF]j@{Bj@iB|BeIBM@A@CBKRk@Xy@d@_B?AHc@BKJu@JuAB]@[GyAIo@?AGe@Ig@IYQi@Wg@KWIMIOe@u@QWmBkDMUkAoBS]MUy@wAWe@Wg@IQMUOa@Y{@W{@W}@Ow@_AkF]aBm@iC]}@Si@e@{@CE_@o@g@k@WWGG][m@e@e@[UQcAu@m@c@cCaBWSu@e@iAy@kBqAAAaAu@yB}Am@a@qA_Au@g@uBuA_CcB_BeAoAy@}BgBkCgB}DiCqBwAi@_@m@c@eBmASMuAcAcAs@WQu@i@_Ao@wAcAsCmB_Ai@gCwAcAi@}@e@_Ag@cB{@oBeAkCuAuAu@WM{@e@_By@mAq@yBiAyC}AaAi@]QmCuAy@c@_@QuBoAQKSKSMCAOISMQMSMQMQOQMQOQOSOOOQQOOQQOQOOOQCEKKMSOQMSOSMQ_@g@oB{Cu@iA{BoDuAkBeAcBmAwBwB}CMQeGuJW_@Ua@OUkAkBaA}A_BgCk@{@kAkBcDgFcCyDOUOSuBaDyD_GEGsFoIgCsDeCuD_BgCU_@oFuIiAaB{AcCoMaSmB_DyC}EWa@c@q@yA{BqDuFgBmCIKIM"
                                },
                                "start_location": {
                                    "lat": -22.874821,
                                    "lng": -45.260555
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "20.2 km",
                                    "value": 20197
                                },
                                "duration": {
                                    "text": "14 mins",
                                    "value": 811
                                },
                                "end_location": {
                                    "lat": -22.6617815,
                                    "lng": -44.9790341
                                },
                                "html_instructions": "Continue straight onto <b>BR-116</b>/<wbr/><b>BR-459</b><div style=\"font-size:0.9em\">Continue to follow BR-116</div>",
                                "maneuver": "straight",
                                "polyline": {
                                    "points": "tt~iCtjnrGYa@cA}A{A_CsAuBU]sBcD{BkDuD_GsAsBk@_AkAeB}@uAc@o@Ye@EIOUAC]e@eAeBiAeBy@oAU_@oB{C}BmDgAgB_BcCEGOUU_@EGOUk@y@kAkBw@mAs@iAm@}@_@m@s@gAe@s@ACm@}@q@cAo@eAYa@a@o@e@s@s@eA_AyA[k@c@q@kBsCo@aACCoAsBYc@GI{@sAw@mAo@aA_BeCuAuBaA{AaA}AW_@wAyBs@kAw@iAq@gAeAaBs@gAs@iA{@sAw@kAeBkCwA{BaA{Aa@m@[g@iByCQUsD_GcCyDU]mB{CgK}OSYQY_@i@Q[i@y@{DcGo@cAwBqDo@aAuAkBqCwEuAyByA{BaBaCk@aAw@mA{AcCeAcBUa@cAwAaA{AKQIMk@}@SYMSq@eAo@eAS[U]AAs@iAc@q@U]U]EG_@o@Wa@CCo@aAqAsBgBqCiAgBqAoBqAqB_D}EAAcDgFk@aAeAaBWa@MS[c@c@q@iC{DU_@c@q@_C{DU_@?A{A{B}AaCs@eAi@}@yAyBYc@mAmBq@eAU]U_@wAyBU_@U]aA{AWa@iC_EoD{FwF{IEIW]w@kAeFcIcCwDkAiBuBcD{AcCmByCoByCiImMoDwFsEgHyA}BaFoHgFaJu@gAIMMOc@s@q@cAa@m@k@_AKOW]U]U_@[m@o@aAa@m@Ye@]i@i@{@k@y@Ya@GGa@o@EGe@w@o@iAeAaBw@kASYq@iA]g@eAcBSWm@cA[i@g@w@]g@y@mAu@iA[g@MQ_@s@]g@g@s@Yg@Wa@KSIKGKU_@i@w@e@o@iAgB_AyAUe@m@}@i@{@k@{@Wa@AAU]Q[e@s@Yc@yA}Bw@oAu@kAyA_CCCaA{Ao@eAy@iA{@uAo@gAc@q@oAoBm@_AyAoBuAwBiCaEgBqCU]KQ]g@m@aAU]OWo@eAU]U_@oDuFU]mB{CwAyBU_@A?aBkCwBgD}AcCmByCU]mByCU_@}C{EmCcEuBgDKQaBiCeBoC_BcCaBiCa@o@wAyBU_@_AyAW_@{EsHU_@Wa@i@y@cA_Bi@y@]k@gAaBKQMYeBkCIMU]s@iAc@q@}@wAYc@q@eAy@sAgAcBoAmBYc@S]_AyACCcA_Bg@w@}@sAqAsBm@_AeA_BKOy@uAQUYc@IOi@w@i@}@o@_AuCwEi@w@U]EIk@u@W[UYIKMOOQc@[_@[CCy@g@[SYO_B{@}@e@_@YIESOEEQQY[_@i@OWOUM[IQI[AAMc@M_@SqAIw@IaAO}BKqA?IQyAG[ESCQMk@CIMa@Wm@KUS]cAyA]i@EEOUyAoBIIiB_CsF_HW[mDiF?AuAqBwBeDaCqDqBuCaA{Ac@o@}@uAe@w@MWACIOIO?AK]Sm@Mi@Ke@g@gC"
                                },
                                "start_location": {
                                    "lat": -22.7721119,
                                    "lng": -45.1346666
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "0.2 km",
                                    "value": 248
                                },
                                "duration": {
                                    "text": "1 min",
                                    "value": 11
                                },
                                "end_location": {
                                    "lat": -22.6612561,
                                    "lng": -44.9766887
                                },
                                "html_instructions": "Keep <b>left</b> to stay on <b>BR-116</b>",
                                "maneuver": "keep-left",
                                "polyline": {
                                    "points": "bciiC|}oqGKq@Y{Bi@sDWqB"
                                },
                                "start_location": {
                                    "lat": -22.6617815,
                                    "lng": -44.9790341
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "2.0 km",
                                    "value": 2040
                                },
                                "duration": {
                                    "text": "2 mins",
                                    "value": 99
                                },
                                "end_location": {
                                    "lat": -22.6540413,
                                    "lng": -44.9589236
                                },
                                "html_instructions": "Keep <b>left</b> to stay on <b>BR-116</b>",
                                "maneuver": "keep-left",
                                "polyline": {
                                    "points": "z_iiChooqGQiAQcAq@wE{@uFE[AIAIq@sE?CIe@AAo@mEaAmGe@_D?AIe@?CIk@QeAq@mECQEc@G_@AEIk@m@uDO}@Mk@YoAK]Uq@s@iBo@yAACO[Ug@sA}BeC}C}CqDw@}@{AkBCC]a@yB{B"
                                },
                                "start_location": {
                                    "lat": -22.6612561,
                                    "lng": -44.9766887
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "25.8 km",
                                    "value": 25788
                                },
                                "duration": {
                                    "text": "19 mins",
                                    "value": 1127
                                },
                                "end_location": {
                                    "lat": -22.5378138,
                                    "lng": -44.7752736
                                },
                                "html_instructions": "Slight <b>left</b> to stay on <b>BR-116</b>",
                                "maneuver": "turn-slight-left",
                                "polyline": {
                                    "points": "vrgiCf`lqGg@W]UYS]QOGQI_@Mc@Oc@Oc@KICYGGC[Ee@IcAOs@K_@I_@I[KC?AAECEACAICSMaBw@[Q]QWQQKQOOKSOc@a@SQc@c@MOc@i@a@m@s@oAaAsBo@kBM_@Ga@CI?EAMGQEMCGAGQ_@g@_Bc@mAe@gAMYCE_@k@QWaAgAs@o@eAgAIIy@y@o@m@_AaA{@y@_AcA{@w@_AaA}@}@e@g@iAeAqAqAU[KM_@e@U_@_@o@a@w@Wg@KYEOWs@WaAMg@]aBOiAMiBG}@GuAGsAAIGu@OkCGw@QaDK_AQyAM_AY}@Qc@OYKSGMMSGIOS]c@UU]Ya@[SQGE{A{@}Ay@MIkAm@y@e@k@_@AAsAiAw@{@k@o@a@k@_@k@]o@]w@s@eBq@iBa@eAm@aB}@sBQg@{@wBO_@w@yBg@kAs@gBk@yA]_Aw@qBk@iAe@y@g@y@o@w@uA_BiDwDg@k@UUk@w@a@e@MOMUWa@s@uAkAoC_@cA]cA[}@EM?CO][cAkAsCY}@gAaDyA}Dy@uBg@{@{AiEi@{Aa@sAQg@M_@IYI]Ke@G[Gc@E[C[Ce@OsEE}BCsAAKCu@Cc@?MAi@AUCQAGAMEYOg@Qk@KUU]KMQWUSMMOMOIMIWOUGWG]IyAYoAWiAUuAYWEWG_@MYMYK_@QSOSMYWSQUYQUQWg@_AMS{AuCq@sAu@wAi@aAe@aAg@}@g@_AS]e@s@U[GK_AyAgA{AOUk@_AiAcBEGGIGKU]U]?AKO_AuAi@s@i@w@U_@[e@SYSYOUS[Y_@Y]c@c@[UQOSKQK?AMGQIUKm@SaA]iCw@cCw@aCu@{GuBKCwAe@eA]QGKE[McAc@]UYQgA}@w@_AII_DqDg@m@gD{DKKMO{CyDiBwByAeBWY_BmBg@k@a@g@[[CEg@i@s@u@_@e@g@m@QUOQ[[OOOMMMKKYUQM[QYQUKUMWKSISGa@KSEWIgAUa@Ko@Mq@Os@OuBe@_Cg@cDq@_@KgCk@sAY_@I[G[ESC[Cy@Cc@AS?g@@gADuA@k@A[?WAYCWC]EWGe@KOGOGc@Qm@][W[WKKYYKKaGuFkBeBwCoCWWYYg@i@aB}A[[i@o@Y_@EGKWQa@Sc@Ia@Ia@[}BM}@OcAEYGW]cAe@s@GISSEEUSGEWS_@Qa@Oa@K]GGAUCe@Aa@?m@?e@Ge@EeIS{@Ac@Ca@C]Ec@Gi@Mc@K}@[WKEA[O[QWQ?A_@U_@WUUYYWYW]Q[W_@Yk@O]EMKWMc@CMMk@Kc@Mq@SwA[kBm@qDs@mEUyAKs@EUg@wCk@sDUuAKq@Ie@Ic@Ie@Oi@K_@K[Ui@Wk@Wc@[e@]a@W]_@_@eA{@a@Ua@U]Q_@Oe@OAAa@Mw@Ok@Is@IkAEcD@iB@uBBoAFaAFcAL{@NgB\\cARqB`@e@HWFm@F[De@Bk@BIAeA?A?e@C[C_AOgAUu@Wq@[u@_@[U[Uc@_@]_@WYCEa@g@Wc@[m@{@kB]u@y@iBm@uAeA_CyAiDaD}H]w@_CkF]u@kAmCq@yA]s@m@wAcAqBYo@Oc@c@_AUi@Ka@SeAKi@Ga@AEEeAC_A@s@Di@@GFi@Jw@Nu@Lm@H[Vw@DOJe@BGN_ALw@Ho@Fq@Z}C\\cDPeBJw@Fg@RgADWBMHa@Jg@Lg@Py@l@{BVcAt@kCXcA@ILi@Da@Jq@B_@B[B{@@e@AU?CAc@GeAIo@Ig@o@kCkBuGWcAa@yAQaA?CGe@AGGq@C_@A]?[A]@}@D}@Fm@Fe@?CHe@T{@Le@Tk@Xs@N[Vc@^m@Zc@V[b@e@d@o@Vc@Ta@b@{@FSPk@Pm@ReAHy@B[B_@?A@U?w@Cy@Ca@CW?ASqAS{@Og@Qi@W}@aBkGq@kCU_A?CYgAUcAiCqK_@yAU}@Kg@Uw@Qe@CGMa@?AMWKUYk@s@gAc@o@GIKQmCqDy@mAQWCEa@e@i@w@g@m@U]IMMOa@m@_@m@oAwBWi@c@}@Yo@KUMYUg@GMISSa@gA_CACS_@AAiAeC{AcDuAyCc@aASe@GKGKO[MYQ_@?AcAwBsAwCsAuCe@cAq@sAcA{BKQGMg@gAkAiC[u@Ym@m@mAYi@AAGMMOACa@k@a@i@c@c@YY[Y[UQO[Us@c@w@a@e@So@W{@[yAk@_@SYQg@Ya@W[SWW]YQQ]c@QU]]q@eAc@w@Ug@]y@M[Uo@_@_AKm@Ki@AQESE]KeACg@CaAAQAs@?m@@m@J_AFg@Jq@Nm@P{@Lg@n@cCtBaJdBmHBILc@h@}BlBuHVmAPcALiADe@B[B]@w@?Y?W?M?]Ag@Es@KsAM}@_@sB[uB[sBG[Ge@AAOq@a@uAe@uAKYQ_@Sa@MUYa@Ya@e@m@e@i@o@m@WW_@YiC}B_ByA{BcCUWIIe@o@aAuAU[k@y@e@y@CGa@s@Uc@KW_@y@]{@IQm@uAAGe@eA"
                                },
                                "start_location": {
                                    "lat": -22.6540413,
                                    "lng": -44.9589236
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "8.0 km",
                                    "value": 8046
                                },
                                "duration": {
                                    "text": "6 mins",
                                    "value": 334
                                },
                                "end_location": {
                                    "lat": -22.5154636,
                                    "lng": -44.7024547
                                },
                                "html_instructions": "Continue straight to stay on <b>BR-116</b>",
                                "maneuver": "straight",
                                "polyline": {
                                    "points": "h|phCldhpGc@kAs@wB[eAYgAg@mBQ{@Q}@O}@COCS?ACSCMKu@Iw@C]Mi@G]Ei@G}@Ci@CUE}@Ak@@]EaE?aADaFBgBF{C@cB?Q@e@?U?q@Cy@I}@Ky@Sw@g@oAYg@S_@CEe@q@o@}@o@w@g@s@_@g@GKc@q@]k@Sa@IOO]MYIUOc@Uu@U}@Mg@Kc@EUa@gBc@gB{@kDYgAYkAkAcFwCaMCKc@mBKe@WiA]gBIk@SmAUaBG_@q@gGYcD?Ki@gGI{@YuCMy@Oo@a@uAi@wAGSCCAGSi@ACCGKUGSK]g@uAEIOc@eBkE_GkOOc@sAkDiB{EgAoCc@mAAEMc@K[a@{AYuAAKIe@CQOoAKiAMqBMiCa@gIIaBCe@Ae@a@kI[}FC_AEaC?a@?_@?GB_A@w@Ba@@_@@GJaBNkBLmB@y@@}@AaAIwAIaAE_@AEOgAWkA_@qAc@gAeAcCo@uAUg@Q_@Sa@y@iBo@wAaAsBk@mAo@}AISYw@EMQg@]aAYcA[qA_@gBq@wDOy@c@aD[{AQs@Ok@I]AE[{@_@kAw@gBO[iAcCkAcCw@_BQa@w@aB}AcD{AmDGQSg@IOgAuBmAeC"
                                },
                                "start_location": {
                                    "lat": -22.5378138,
                                    "lng": -44.7752736
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "91.3 km",
                                    "value": 91266
                                },
                                "duration": {
                                    "text": "1 hour 6 mins",
                                    "value": 3952
                                },
                                "end_location": {
                                    "lat": -22.5996391,
                                    "lng": -43.9456175
                                },
                                "html_instructions": "Continue straight to stay on <b>BR-116</b><div style=\"font-size:0.9em\">Toll road</div>",
                                "maneuver": "straight",
                                "polyline": {
                                    "points": "rplhCh}yoGGMmAkCQ_@qAuCa@u@u@yAGOIMGMc@}@a@}@aAuBQa@AAy@aCQk@wAmFeAmEc@sBc@eC?AKo@CKYwAOs@WqAa@eBSkAi@qCm@sCo@yCe@}B_@cB[uAMm@Qs@iAaEa@}Aw@kCe@gBEOg@oB[eAOi@_CqIo@yBSs@uAuE]cAo@sBk@cB_@gAkAoDOc@Sm@gAgD{AoEOa@kBuF_AwCgAaDMa@?AgGsQOa@aA}CaAsCSm@Us@u@yBoAyDw@cCgAyC]_AQc@Uc@S[OUCEW[m@m@a@]}@q@WSyEkDkA{@gCkBWUUSWW]a@EES]KOUa@Ui@So@Uw@k@uBEMWs@IQMW[i@EIMQEGY]UU[[a@]QMa@We@_@]YYYIKSYU_@Ui@CGSs@Ms@C]A[Ag@?}@@s@F{D@OB_CBo@?IBm@Fw@Jm@Ji@Ne@DIVm@R_@d@w@~BkDnAkBt@kAdCwDFIj@aABERa@\\}@`@}@r@eBrAqDr@mB~AiEt@mBp@gB~@eCJ[jA_DdBsE@C|AeE@Cz@cC@Cz@mC\\eA`@wAdAwDj@wBRq@XgALg@lBcHdAwDJc@bAuD`AoD~@iDZmAJ]Lc@bAsDb@sANq@^sB@GBS?ID_@Fc@De@Ds@@m@@[@u@?k@?_B@yB?I@aC@mC@_A@mC?M@gB@iB?W?e@?q@@cA?eABaD@cE?y@@kCBaH@aC?_ADsG@aE@mB@gA@iA?_BByCDwG?}H?mEBeG@aD@uC?W@UBmH@{C?e@@iB?K?e@?g@@mA?e@?_B?aC?EAoA?GEiAKcAMcAOw@Qy@W_AGOSk@a@cAa@y@c@u@y@mAc@o@sByCa@i@]i@o@kA_@cASw@CIMo@KgAAa@Ce@AOOaDQ{DOoD?I]qIGuAIoAKsAUoAW}@[}@Yk@Wa@c@i@U[AA}@iAmA{Au@}@gAwAs@cAS[]y@ACCGg@yAc@wA{@_DQo@YaAYeAU}@GUe@cBU}@i@mBaA{De@gBa@qA_@mAAEOm@_@}A_@_BQs@o@{BYeA[iAk@_Ba@sAa@iAi@mBiAkEMa@s@gCEQ}@}CM]KUIQWc@QUqCaE]e@W]cA{ACEQWm@{@U[AAU]W]MS]m@k@mAOo@Qw@Kg@CWGe@CQCk@Cm@?GCe@IcDMmFI}DI{EMcBESIk@Su@Qk@ACOa@IQSc@o@kAcAmBOUOYwAkCMUw@_By@yAgBaDo@mAO[cBaDw@uAqA}Bc@_AUc@m@qAUk@MYSk@Wu@Uu@c@iBk@oCaAuD{A}Fm@qCGSqBgIQq@Qs@e@kBe@iBq@qCg@}BESEQe@mBYkAa@cBMi@Mc@GYOo@Kc@EQGQKc@GUW}@[aAOg@Si@o@sAc@aAS_@Qa@S_@Ym@a@s@e@u@aA_BkAkB_D{EaBkCU]U]KSwDcGU]gC}DkBsCwAyBoAoBcAcBo@eAWg@c@_A]w@IUQc@KWa@kAy@gC_@cAY{@yBiGQc@yAiEk@_BmB_Ga@mAm@_Bi@aCWoAKo@EWAQSuAGm@Gs@G}@Cq@ImBCo@Cc@YuHc@wJIkBUcFOqDMwDOuDOyCM{BASASAWAYIoAMcDSsEAOGsAIyBG{AEw@C[Es@G{@Is@Gk@Ig@Iq@Y_B[eBOcAQs@QeAy@uEG]CIEYCK}@mF_@}BaCkNkEsV{AuHg@iCkBkJeBmIIg@aBcIEOS_A_@{B[gCGgAI{AAqC?mC?u@@uD?iA?mACoA@WC_AGgBY{HKuCIuBE{AEw@O{EGaBI_DIuBEmBCs@?KA[AKAu@?g@@o@@o@Bi@PyBHy@R{CDu@TeDb@kF@IB[@ITqCdAgNP}BB_@D_@@]LqA^oEFcABOLwAJeABa@?IBw@@u@?G@o@Aw@?c@Co@Cm@Co@Gm@?AEe@CSGs@Ks@AEI_@SiAc@cBKc@U}@{@kDm@}BAKCIa@}AK_@GUKc@Ie@Ii@Gg@Ic@Ee@Ee@Cc@As@[wGYaI_@wJc@}JEcBe@sKGyA[oIo@kPCe@WoGI_COwDQqE[}HCg@GkASgGUoGMoCa@yJMgDSeEEcASuEEiB[}HU{FAg@a@aK?YAIAc@c@eLQeEI_BCm@IsBEkAGiBGgBCy@WeGAMQ{DE}@e@mLQ}DOmDE{@K}CEu@IuBGyAEgAEoACqAAM?MEw@GsAAc@Aa@SkFCe@IqBGoACe@OsCCm@Ae@i@sOEq@K{CK_CWaGOyEOcDI{AA[SiEEkA?[IaBAc@WmFCw@Ew@]uIE}@IsC]_JEeAMmCOsDCe@I}BYcI_@}IE}ASgFIwBC_AMgCAe@EgBGgAU{EU_GKkBIoBK_DIoBIyAGoAAm@I}BOuDEiAM}C?ECa@KsCGwAKiCOcEMcDM}CIqBI}BM{CMkCI}CSyESqESqFGmAMyCGoB?EGsAOkDUmFI_CMuCG}AIeCIkAYoHI_CGuAMoCAq@a@}II_CEsCCw@E_D?mA@wA?}@?Wb@mVFoD@e@@g@@e@B_APcEZkDPkAP{@VeABGLc@XgA^cA~AyDHQzAsD`ByDN_@N]~BuFtAkDdBoD~@aCJ[L_@Ha@Jc@Fe@Ba@@o@?k@GuAQ}Ai@cDk@{DO}@Ks@OkAC{@Cy@@q@Bu@Di@N}ARiAV_APc@\\{@Zo@f@y@T]l@w@xAsAt@s@nGaGZSl@e@t@e@rAk@~Cy@PGdB]`Ba@`@I`@Ip@MpBy@^W`Ao@VSTUh@o@r@{@dB}BlA}ADEZa@dBmCj@eAVi@rBgEN[pA}B^k@Vg@^g@`@e@dCiCf@i@rI{Ip@u@RQhAsAtAqAFEtBwBtBwB~HoIr@w@d@k@DINUTa@N]DIJYBIJ]Ji@BMNs@ZyB@ODUPgAfAoHl@}DFe@Hc@dAmHHe@Fe@PgAt@eFZsBRqALu@NaALs@Rq@^{@l@gAh@{@f@u@V]bAyA@CR[T]j@y@p@{@VY`@]\\U`@Qj@S~Ae@`@Kn@St@S`@K`@KDCZIvBm@t@_@r@_@@A\\U\\UJINODEXSj@m@\\_@FI`@s@|@_BRa@dAoBbEaId@m@PSDGrAsAtAuANObBeB`BcBDGHMl@oARk@Pm@Fi@@AH}@Do@@i@Au@?CKgCUgF[gFImACaB?a@?i@Be@Hy@^yA?ARk@L]JYZg@b@{@`AeA~@s@`@WRKHGt@c@t@c@v@]dBeANKd@Y`@UpBoALIDCf@WtAy@jCcBj@c@JILKjAeABAlAsAv@}@@AdAwAn@_Ab@q@Xe@RWvBeDb@m@|A_CV_@T]R[@AT[~@wAjAiBbAmBVk@Nc@@?Na@?AJWl@uBXsAV_BFo@NmAJw@^wBLi@@GHa@Nm@Pk@Tk@@AP_@Tg@b@_Ah@cAh@u@LSf@o@TYxA}AlAmAXYbC_Cj@k@X[POX]h@i@LKTU|AwA@AhAiAt@s@VYPQj@s@l@s@\\g@LQp@cApAkBFI`AyAT_@NY@CP[Rc@Te@^{@@C?AL[b@gAZk@JQ@AHMHMTYX]f@i@b@a@XUb@W@A@AXQb@Yb@_@RK^_@X]^k@P[Tg@JQTm@Xm@Z{@\\y@Ve@`@g@PQPMNOBAJGd@YvAo@bB{@`@ULIJIb@c@@?d@i@^k@Te@L_@HSHWH]Lo@Js@D_@BYNuALsAP}AP}AFc@J{@@OLkAH}@LiAHk@BIFi@Hi@Ng@Ne@Pa@Ve@Va@V[BCVW@AZWZS`@U^Q`A_@jAg@lAi@d@Yl@_@LKZYVWTYb@w@Vi@`@{@\\q@Vg@JQf@s@l@k@d@_@b@UVO@?ZQjBu@dBq@TK^QLGpAm@FCTOTMp@i@lA{Ax@oAnAqB@?T_@@AVg@f@s@X_@NSZa@v@{@p@w@zAaBhAmANOdBoBb@c@Z[|@cAn@u@HQtDyDl@q@~@cAb@a@TQ^YRKj@[|@c@dBs@pB}@x@]n@Y\\KLEp@Md@Gp@CX?^BL@J@VBJ@t@NnA\\zAf@LDD@RFnBn@\\H^Hh@F^BZ?Z?j@CVC^Cd@IZI^K`@Ob@S`C{ArBqANKPK|AcAxCmBxA}@hCuBNMvAcA|B{ADCVQtBwAtA{@n@e@ZWb@Yj@a@`@Wx@g@bAw@RMb@[`@[`@_@d@g@DINUVc@JUPa@Ni@Li@Ny@RaBJ{@VqBLcAVsBD_@H]FYH[HWJYLWXe@TYPWRUVUZUPM\\QZO\\Mj@Oh@MhCa@ZC@?XCvB]DAv@Qh@ITChAQfAQNCr@OBAXGXIXKVKVMVORMTSTSTWX]JMNULWRc@Pc@Ps@He@DUDY@[@U@]@o@Ac@Aq@Am@Ak@Ak@?]?]@]@]BU?EBO?A@KD[F_@F[H_@Ni@BIFOb@wANe@BIb@sATq@Xy@h@cBJYJWLWDIFK?ANULUPSRWRQBCBCRQXQZQTMTIZMDARG`@ITEZGp@Ef@Cb@Eb@Cd@CnAIl@El@Al@Cn@A`@Al@Cd@CVANCd@Eh@If@I`@IDA\\Ir@QjA_@l@S^MTK`@QVOVQXSVUVWTUVWVYNQNQNUJMLUJUN]J_@BKDWBWBY@Y?W?G?KAYCa@Ia@G_@K]G[I]Mk@Kc@a@eBQw@Qu@Kc@Ke@}@uDI]Km@Kk@Mi@IYAOMi@Gi@Ei@?CAW?O?KAY?A@Y@_@BWBYF[DWFYF_@Pk@Lc@BKj@yAHU\\aAPk@HUHSVo@Vo@Tq@ZmADYDWBW@Y@W?Y?E?SAYAYCYEWOw@I[I]EMEMMYO[OYOWSWs@mA]i@]i@o@kAYg@IOQa@Uq@IUE[Gc@?CKm@IoAA[MaCIyBCi@Ei@Ac@I{AC]E_@E_@ASAK?_@?]@_@@_@B_@@E@QBU?ADWFWFUHWHUJUJSHMZm@Ze@Zi@^u@d@}@t@_BVu@Rq@@KFa@?CDe@Do@A]?SAc@?EG_AKkAKu@MgAEYEYGYCKEYG[Uy@Oe@[cA]eAc@uAI_@I]Kk@Ky@?CEg@?EAw@?s@Dm@Fi@D[@SFw@Dm@@a@?i@Aq@Gs@?CGi@Kc@CQAGKi@g@eAa@s@Q[OUc@o@{CcFmB{CAAm@u@e@g@MS}@qA[g@_@m@MSEI}@uACGU][i@c@s@EEOUS_@MSMWM]EKIQK[AEKc@AEGg@G]?EC_@AQAeA@]?GDk@Fg@Hc@Lg@\\cALW^s@h@}@l@iAr@kAp@oAr@oAf@{@JSdAeBjAoBz@}AbAgBXc@V_@Vc@X_@PULOXYPORORMTMTKTKVIVG`@IJC`@I`@C`@Af@?d@@d@B`@DbAJn@H\\F|@Hz@LfAJ\\BZ@z@@L?H?f@Ef@GbAQfB]tDw@HAVGf@IZIXI`@MJELE^Ud@Y`@]TS\\_@^k@JQJQHUFODOHSJe@N}@De@Fo@JkBPgCLaBLq@Tw@?AFSN]N]`@s@V[?AJM@Ah@e@n@c@VMNGLGf@Qn@SZCXCj@GV?ZAR@P@V@\\DzATP@fAL|@HF?r@@n@?\\CZAVCTAf@I~@Sb@KdAa@\\QVOp@a@`@YTSvBaBpCwCXWhFqFnEuEZ[`@c@j@[d@S@?\\KVGn@MfAKj@Ep@GXC^CPCXEDARChASp@Yx@a@t@i@RSVYV]@Ch@y@HO~@_Bj@_ADG^g@l@i@RM\\Ut@]j@U^OJEvAg@j@SVIxAi@|@c@t@k@VSX[b@k@HKPSHOBGHKBGBGBGDKDIBIBGBIBIDKBK@G@EBIDQ@I@G@G@KBQBO?E@I@G?I@I@I?I?G@O?G?I?G?I?E?K?K?EAG?IAOAIAOAOAKAKGm@c@kDGo@_@wCMiA_AiIa@gDGe@s@iGE]MaASeBGe@Gg@Io@E[uA}KGe@S_B[qCY{BM}ACc@EeABiBLkBJ}@d@{DNwA?CDe@Ho@j@iCP_A`AiCn@aBl@oAzA}DZu@dAqCp@aB~@yBtBaFz@qBxAmDJUPa@Xo@`@_ABEDKFMHSDKBMDKDODK@IDOFULu@BO@GBI@M@O@M@O@M@I?I?IFuARoOBiC?I?K?M?I?IAU?MAGAUAO?KAK?IAO?SAYAYAKAKAUCYAOCKAOAKEWEUEWEUCMCIEUGQAEOg@Sm@Sk@[s@[o@Qa@KQuAmCeBmD}@kBwAuCcAuB_AkBACq@uAk@iAACc@_Ak@kAcBcEOc@o@sBYy@[_Aa@uA?AOa@{@mCOc@e@_Bo@sBi@kBACK_@W}@o@sBUwAU_BGe@M_AiAaJAKg@{Di@aEEWGe@YoBGe@AKEYYyB{@wGa@wC[cCe@{DAIUcBScBe@mDo@cFe@qDe@kDM_AG[OuAASC[A]Ag@GwCAw@A{BAcAC{CAiA?e@?e@?iACkA?e@EoD?MA[?eCE{B?aAAq@Aa@Ai@AQCUGo@MeAKy@OoAYaDAKSmCMaAa@kD[qCWaCCW?CAGAI?IAG?G?IAq@Ac@?U?Y@S@S@MDu@BWBK@MFWBQDSBOHe@Nq@J_@JYJWBIJWXg@\\k@Za@JMrA_BtAoAh@e@j@g@dB{A|@u@h@g@NMLMNMjCaC\\[l@m@RYJMDGBER_@Vi@JWHULa@F]Fc@BSDe@@g@B_AEuAC_@?MCm@CaBEcACaAAOG}AG}BIcBAWCSCw@IkASsAY_BKo@c@oCw@oEMu@GWGa@EU?CMo@WcBSkA[eBKm@_@aC[uBs@}DYaBg@}Cc@cCUuASgAO_AI_@ACMw@Mg@Q{@UaAYiAuAuFg@oBu@sCcAaE_BoGu@mCOo@c@eB[mA_@}Aa@yAG[Qk@S{@a@iBWaAm@wBSk@Ui@e@_Ai@kAi@aAS_@A?S_@[i@q@oASc@O_@Ma@Qo@G_@E[Gi@Cc@?{@@w@@W@CD[Fa@H]Ja@HWN_@^s@Xc@nE{GtBeD~@sA?ABExA{Bn@eAh@eADK@Al@eBp@cCt@}Cb@qB|@uDXiAf@oBP_APqAF}@DgABoADcA\\qOVkK?gABmADgADaDFkCBkADsA@w@DqABcBBg@@m@Fs@Fg@DWH_@Ne@Tk@L[NYXc@RUhAuAp@u@xBaCX]p@q@VUb@]HGRKZQPIb@Qb@Od@MFC^I@?lAY~@U`Du@DA`@K`AU`AUDAhD{@b@KrCo@`EcAlBc@FAb@Mn@Ot@Q|@UfDy@|Ai@v@Y~@_@~@_@~@e@b@Yb@[\\[VUTWBAxC}CpBqBpAwAd@o@`@q@Rc@L_@HWJa@Fa@Hg@Da@B_@Dq@Bw@JeDDkA?AB[@w@?gA?g@CcBCu@E{@Cu@QgB"
                                },
                                "start_location": {
                                    "lat": -22.5154636,
                                    "lng": -44.7024547
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "7.9 km",
                                    "value": 7902
                                },
                                "duration": {
                                    "text": "6 mins",
                                    "value": 339
                                },
                                "end_location": {
                                    "lat": -22.6456605,
                                    "lng": -43.8958886
                                },
                                "html_instructions": "Continue straight to stay on <b>BR-116</b>",
                                "maneuver": "straight",
                                "polyline": {
                                    "points": "v~|hCbcfkGKuCUaG?C?a@O_DCk@A]?YAG@[@a@@YBQ@UBW?CDS@GBUDOBKVu@Vm@LWDIN[hAaCxAuCpAcCjAoBnDcF`AgAFEb@[ZMt@W^Kh@Et@EbDMdAGB?hAIt@Kx@K@A^Kj@SNIFC`@OZSXUz@{@~@mA\\k@p@gA|@{Ax@kAh@i@p@g@f@YXO`A_@~@UJAf@GpAA`ACnB?x@AfA?h@CjA@v@BjALb@LdARj@Ll@Jt@L`@F^B`@?v@EPCXEd@Mb@Qx@g@@Al@k@^m@Rg@Vu@Ry@^{AVgARo@Pi@^u@\\o@f@g@bAcA~@w@~@kAlA{A|@sAT]xBuCR[p@aAh@w@VWTUZUt@_ABET]^e@jAuBjA}AT[FIv@uAlAkB\\u@`@gAV_ATkAH_AJaBFmADg@?CFkBBaBFkAJcAFc@Jc@Ne@Re@LWNWP[`@e@V]PSTWx@eAp@u@n@s@hBqBnCaDnAyA`@e@HKPU@APQb@g@l@q@RYBENSJMb@m@`AmAp@y@pAeBdBmC\\s@Vg@j@kAn@uAt@_BP_@~@mBj@mA`C_FHOl@eAZg@hAiBn@_At@eAl@{@?APW|@mAl@o@n@k@@ARSb@[v@g@`Ak@XQVQVSBAJGJIJKHKTYRYFK^k@d@y@NWZi@d@w@RYPSb@c@f@_@^WPId@Ur@UDAVEZGjBWr@Iv@M^Gr@QnAa@zAo@lD}At@[zEyBdCeA^QjBy@TI"
                                },
                                "start_location": {
                                    "lat": -22.5996391,
                                    "lng": -43.9456175
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "7.4 km",
                                    "value": 7444
                                },
                                "duration": {
                                    "text": "6 mins",
                                    "value": 354
                                },
                                "end_location": {
                                    "lat": -22.6655219,
                                    "lng": -43.8405931
                                },
                                "html_instructions": "Continue straight to stay on <b>BR-116</b>",
                                "maneuver": "straight",
                                "polyline": {
                                    "points": "j~eiChl|jGzFeCdLaFd@U^O`@Q~Aq@r@]j@U~CqAbBs@hBs@XM^OpBy@NG`A]vBu@vDgA^K`@Mz@WxBm@tBo@zAc@r@Wd@UXOr@e@@AZSFG@?HGbAq@FEZWdBqAj@_@rByAZU@AhAu@z@g@fBcArBsApBkAr@e@^[PQ\\[p@}@b@y@FOXq@b@{A`B_Gv@aDNs@RgAJm@H_AHgBAs@Dc@A{@A}@KaBOkCUiDUqDMgCI{BEkBCcAAEA}@?kC@oBDeAFy@LeALeAZwBPy@@CHe@Vs@\\gAb@qA`@eA^cABCJW^eAX}@La@F_@Fk@Bi@?i@?e@CQEa@Gc@I[Qc@Qe@Ym@w@aBUo@Ke@Ka@Ca@Ai@F}@JeAPk@Nc@R_@BEdAaB^o@`@q@R]N_@R{@Hw@@{@Ae@?M?i@@iAFu@Li@Tq@f@}@x@iAt@aAXa@fBaCb@k@h@w@f@eA^kAD_@BUB[Bo@CeAEo@Iy@AKCYEa@E_@Gc@Ik@Ic@I[ACMk@Si@Ym@i@y@Y_@][AAe@e@]]i@i@c@a@g@e@WWYWYWUWSQSQSSSUMKKK[[[YWUWUQSKQGMKUCCCMI[CY?U?]Fc@BSDOHORa@d@}@l@qAXi@JYBa@@U@U?U?[?k@A]Cg@?a@AU?Q@c@@ED_@F_@Pw@F[\\aBDMXmATmARiAPu@D[AUCe@Gc@KYKMSSKOQSMKOKuAk@YM[Og@W[SQI"
                                },
                                "start_location": {
                                    "lat": -22.6456605,
                                    "lng": -43.8958886
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "60.6 km",
                                    "value": 60557
                                },
                                "duration": {
                                    "text": "52 mins",
                                    "value": 3110
                                },
                                "end_location": {
                                    "lat": -22.8002949,
                                    "lng": -43.3535386
                                },
                                "html_instructions": "At the roundabout, take the <b>1st</b> exit and stay on <b>BR-116</b><div style=\"font-size:0.9em\">Toll road</div>",
                                "maneuver": "roundabout-right",
                                "polyline": {
                                    "points": "nziiCtrqjG?AACCCACCCCADI?E?CAKAKBQBMRa@Vg@JWDI?A@EZs@Ru@NWFGFEFEFCHCHAJ@J?N@RB`@@fAFr@FX@R?N@H?N?H?LCNGHGHKVc@JMHGDALCHAH?N@RBNDTHx@XJ@F@F?FADAFALELGZ]R]BM@QA_@Ga@Sq@O_@gAkCm@}AEMEMAI?I?KDS@G@EBEDGDGDEBC@ADCBCDA@?DAB?DAB?D@D?D@D?F?D@D@D@JBFBLDHDJFPJFDHDHDHDFBJDHDHBHDLDJBNDNFLDJBHBHB@?F@F@H?D?F?JAH?JAFCHCDCBCDCBCBEBCBCDGBGHKJQHOFKJSHOFMFKDKFIFIBIDE@CDEDEDEDCDCDCFADCF?FAD?@?H?F@F?J@H@L@J?L@F?BAD?DCFCFCHEDEFEBEDGDG@G@G@G?O@OAO?QCQCICKEKEMEKGKIOOUMQMSIOIMIMMSKQMSMSKOMSOSOSIMEGEEIKKKGGGGGEGEOKQKKGMGMIMGKIIGKGGGIGEEGGEGIKEIIMGMGQCKCKEMAMCICKCICIAECECECEECEEIEICGCGEIEIEIGIEGEIGKGGEMKKKMOOQKMKKIMIIGIIGEEECEEECIEGAKEMCMAKEKCOEMEGEECEEEECGEIEKCKCOAQCQAOEe@CYCUC]CWAUCUC[CY?EAGAM?E?E@E?E@IBIBKBG@EDGBEDCDADADAF?H?L?H?H?H@L@L@PBJ@L@JBF@H@HBDBD@DDFDBDBFBFBJBLBR@LBN@H@H@F@FBLDLDLDJDFBFDFBBDBDBDBFDD@FBJDPFF@HBJDLDJFJFFDHFJHDDJFFHHFBBDBDBDBDBDBFBJDJFJDHBJDJDJBHBHBJ@D@D?FAB?FADAPCJAJCB?HALAFAH?F?F@H?HBD@DBBBFDDDDFDF@FBHBHDLDLFPFLDJDFFFDHFDFFFHHFFDDBDDHFJFHFDBBBJFHDHBF@D@D?H@D?F?H?FAJ?JAN?RAPAH?F?F@F?DBF@DBB@BBBDDDBHBHBHBLDJBHBJBJBF@HDFBFDHBDFFDDFDHFB@FBD@F@H@LBLBH@H@LBHDFBFBFDFJFHBH@JBL@J?HAJAHCJCLCLCJCPCNAF?DCJALAHAFALAJAJALAP?H?H@H?D?DBF@HBH@HDLBFBFBDDHDHFHDDFDBBBBFBDBFBD@B@B@D@HBJBD@B?HBFBFBD@DBFDFBDBB@DBFBDBDDBBBBBDB@B@DBB@FBD@D@D@F@H@F?H@H@J?F@F@D?D@F@D@BBB@BBB@BBBDFFBDDHBHBHBJBL@HBLBP@H@F@FBF@FBB@DBDBBBBDBBBBBB@BBB@D@D@F@D@D?J@D?D?F@D@F@H@HBJBJ@JBH@LDFBFDDBBDBFBDBHBH@H@H?J?L@L?L@J?J@LBF?@@FBHBJDJBJBJDL@FBF@F@D@F@F@F?DAF?DAF?FAFAH?DAF?HAFAD?HALAJAL?JAF?H?H?H?J?H?F?H@D?F?F?H?D@F?H@H?J?F?D?HAFAFAFAHCHAHAJAJAH?FAH?F?H?F@H?@@FBFBFBHDFDDDDBBF@DBF@D@D?F@D?D?FAF?DADCJCDEDCBCDEDE@GBE@I@I@I@G?K@IAK?EAEAGCICGCGCECEGIEEEEGGIGGEEAIEEEGGEEEICICKAG?I?M?K?IBK@G?A@IFUBMBMDMBMBMDMDMFOFQJSJUDKDKBI@K@I@KAI?I?KCKAOAI?O?A?K?G?G?M@M@OBQBM@Q@Q@M?MAKAKCKEKEGEEEEKEGCEAICKAIAQAQ?QAOAMAMAE?CAIAGAGCKEGCECEAECGEGEGGIGIIGIAAOUEGACEKEIAICIAKAIASAO?OBQ@IDSDUBKDO@IBI@I@G?I@G?I?OAG?I?OAOAOAG?EAKEQCKCICIEGCGECCEEEEEGIACEEIKIMKKKMGGKMCCMMKMMMOQKMIMIKGIEGEGCECGCICKAGAKAK?I@U?W@K@O?M@OBM@I@K@MBIBIDGDIBEDEDEDEFEFELGFGPGJGLGNGLGHCF?F?F@D@J@FBF@HBNDJDHBNDLDLDF@F@D@@?H@F?FABADADABABABAFCDEDCHEHGJIHGFGLGHEHEFAHCHALAJ?LAH?J?H?DAF?JAF?DALAJAHCF?FAFCFCFCFCHEFEBCDCBCBCDGFGFIJKHKFGDEDGFGHIFGFGFEFEHEJGFGJGHGHEJIFEFEHEHGFEDEDEBEDEHKHKHKDGDGBGFMLQJUJQFKFKDIDKBK@K@K?KAKAICOAIAKCKAI?I?I?K@I@G@IZmA@SAO?MEKGQGIIIKKKEMCC?ICYCY@OAQAWKq@a@a@WYOGEUMIGYSe@Y_@M[KUGYAs@GYCWIOGA?QKe@[qAcAsAcAGEGESQCCk@a@_@[[[MOQ[MSK]Ga@Ek@?[?[?W@E@SDuA?YAO?WE[Uq@[k@?AO]g@eA?AQ_@Yo@k@wAEMCGAIAAAIAG?GAK@GBOBS@CD[f@mCDQDQFORYV]VU`DyB@?dBgAp@a@ZSLKTOd@YZSd@[z@i@\\U|@_@`@KVITCVEp@?RA`BC`@?B?V?t@?z@@z@D^DVBd@JTDTDb@H^FZD\\DTB`@@L?NANCNCLEPKZQRWR[Ra@^w@r@_B~@oBd@gA^cATy@|@oDzB{JdAeE@EJ]@Eb@eBbAgEFSdAyEZ_BDONu@D_@DSFa@ReDIiDIuASkCg@qGQmBm@gH]gEEu@Ae@@g@DqAFe@Fe@NmATsAh@yCHm@ViADKLc@DSXu@jAoChAoCjAoCTu@Ne@Jc@Li@Fe@Ju@RsB`@}DHo@FWDYJe@Ni@V_AN_@J[|A}DH[BEL_@Tm@`@cAh@yAv@mBZ{@j@}Al@wA^cAXy@Rq@Jg@Lw@@q@@q@Ew@I}@[sA_@_Bk@{Ca@gBAGI]YsAq@yCo@eDS}@Ga@E]C[Ew@A]@i@Do@Hm@Hc@Le@BGNa@DMPa@Xe@RWf@q@jAwAPUx@_Az@cAX]nDeEZ_@?AX[vBeCxBkCX[rAaBJKpA}AbAkAb@q@NUVe@JQFKJSDKTg@Nc@L]HWFQDQLi@VkAPs@TaAd@uB@Ed@qB^cBBK^aBXsAD[D]D[Dg@Ba@@_@?a@Ak@Aa@CYIiAQcBCUAS[yCKcAM{AYiDKw@I}@e@yEI_B@}@Bs@Fe@Jo@Ps@Lg@Pe@Ta@Zm@\\e@dAwAdCeDj@y@Vc@NYPYPa@Na@Po@^{Ar@mC~AgGDKr@gCr@mCj@{B|@eDDQDQZiAT_A^uAf@eBNc@N_@Xi@R]PYT[NQHKRUfAcA`A_Ap@m@^]@CXUVUBAj@c@XSZURK\\SVQ`@SB?^Q^QJEp@[\\Mb@S~As@@?^Q\\O`@Q^QJE|BaAh@UdCiAHE\\S@?^Wd@_@NK~@aA^i@p@gAZu@JUPg@Nm@@CLo@Hm@Js@JuANkBBa@BY?A@KDm@Fw@d@}Fh@oGH_ARqBNkCLsABe@ReCX{DLaBFs@@OPcCDa@TiCBg@NqBN{BF{@@GHu@RgCP_CLyAFq@TqC\\eE?EFaABc@\\eGNeC`@cGf@kGN{Af@cIBe@ZeEHiAHcAn@sIpBoXPyB\\yEDg@n@yIjA{ORqCViDDe@l@aIT_Dd@gGp@gJj@}Hb@eGToCDg@NmBd@sFPaB`CwUBO@OHo@PaBFe@Fm@j@cGDg@LkADe@d@{Ez@_Jn@qGn@wGl@_G`@eETqC`AwM@I@GDe@TyC^uEBa@j@cH\\qE\\sENaBd@cGBg@Di@hAkNd@{F@IR}BLiBNoBtA{PdAuMb@gFNkBLcBh@}GZcEZqDPcC`@iFd@uGNcBJkABYf@uGVeDVgDLkBL{Ax@eKDm@PkBL}AJ{@De@@GJw@JcAPgARiA\\aBHc@H[Lm@TiAz@yDHc@ViAZwAj@gCZ_BTuAHq@JuAF{@Bq@@o@?q@I}ACiBScBOw@Ki@Mc@m@oCoA{Ds@}BIYeAuDKk@OcAE_@E_@Ee@?GEy@CgA?}@@w@D}@B_@D[X}Bj@gEDSBQNkAT{At@wFFe@Js@d@uDRsBXwCXqCJeCBc@FyBBgC?aBAuDAu@C{@GmBIsBG_AIoAGcAMwAQ_B[gCIk@QkAIe@Ow@g@_Di@cDSiAIa@[eBQgAKm@SgAy@yESmAM{@M{@E]E[Ee@Ea@Cc@Eu@CcACm@Ag@@W?M?k@DqDDiEB}C@i@?g@?C@_BFuFHwHD_DB{D@_BBwA?QBW?KBW@WHeA^uE\\yENyBNgB?AJcBLaBD}@@{@?k@?k@AuA?_@Ae@A_BGqDE_DEyDOuKBkA?s@?s@?U@aABy@F{@Do@JgAJ}@NiANw@Lo@P}@r@yB`@eADIZs@\\q@h@_AjC}CrAeBhAsAnAaBf@o@RWHIDGDEDC@ABAzA_CZm@JSR_@Pa@DGXs@r@oBt@qCDULq@TyAP}ALsBDgA@aBDuC?a@FwD\\}NLqGBu@?_@JkFD{ADo@@U@ONeBBa@DYBYDW|@qF^_ChB}JjAmHToADYLq@fAcG`@}BLs@Ho@ZiBLm@lAoH\\mBN}@l@eDpAsH|@oFh@yCN}@TuAp@mDhAcHh@aDx@sE~@qFHe@\\mB@IXaBf@{CjDqSl@eDr@_ENgALsAJsAFkBBiBAaBGkBGuAGeAGi@Ea@Ig@c@qCu@sC]mAcA}Cw@_CGUM]y@iCOe@Ww@cBoFWu@_ByEW{@mBaG_B_FMa@Ma@Ma@Qm@Uu@{@mC_@mAi@aBcAkCU{@[aAu@eCS}@Q}@QkAG_@MqA?CKeAEo@Aa@EeB?k@HaDBkAF{@FiAPwFNaE@_@DmBFgAH}@@cBFcBD}@LcEj@aPh@qNtBan@L}Db@qLNcEHsBFsBF}ADiAVsGFsAJsCPmFJuBF}@JkAH{@Fk@B]Ju@Ho@Jo@Jm@DYJq@R{@Ha@Pw@J]R{@Ty@\\kAPk@Z_AJWL]Nc@L[HOJWb@_A`@gAf@cAvAgCdBsC`@q@hG_KdAeBv@qAf@w@T]BE\\k@`@s@PWf@w@fBsCpAyBNUj@{@fAgBPYv@oAx@mADSJSz@sA`@q@lB_Dd@s@FIx@uAn@cAr@kAv@sAb@o@lAmBbC_ElEiHpE}GlEkH~AoCb@w@R[hByCf@y@hAmBx@qA~@yAhAiBf@w@^o@\\o@bAeB`AoBr@yA^u@l@uAl@sAFUTg@h@qArDkJ~AmE^cAlAcDf@mAtBkF\\_AvAqDFQb@aAVs@d@kAd@iAb@qAPm@Ri@BEn@yAJWxAsDh@mAf@kAJOHQbAsBRa@Xk@h@cAr@qAbAcBR_@@AR]R]T_@T_@BE|CiEdCeEbCeEp@gAp@gAb@s@T]`@q@rAuBbDiF`A_BnFsIBCl@cAt@oAbAaB`@m@b@s@`@o@NUNULULSXe@Ze@NULWV_@@CR[R[JQHKVa@Ta@V_@V_@Vc@Xe@dA_BfAaBdB{CZk@Vg@P[f@aAf@cAd@cAVe@bC_Gr@gBRk@Rm@f@wA^iAr@mCd@eBXiArBaKh@{Cr@eEPiAD[DWVaBJo@J}@Lk@Li@Nq@Lg@Ne@Pe@Tg@^y@bAwBhE}IR_@Ti@lB}DHQJQFOFOlDmHvCgGPa@bIqPtFoLpEkJPa@R_@^w@|AeDXk@tCgGBEFMJWlAcCxA}C|AcD|AcDP_@Zq@n@sAz@gBx@eB`@}@^w@^s@\\s@?C|@kBjByD|@oBz@iB\\u@hAgCjBaEFMpAqCJURg@"
                                },
                                "start_location": {
                                    "lat": -22.6655219,
                                    "lng": -43.8405931
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "0.3 km",
                                    "value": 349
                                },
                                "duration": {
                                    "text": "1 min",
                                    "value": 18
                                },
                                "end_location": {
                                    "lat": -22.8020169,
                                    "lng": -43.3507104
                                },
                                "html_instructions": "Take exit <b>167</b> toward <b>L. Vermelha</b>/<wbr/><b>Pavuna</b>",
                                "maneuver": "ramp-right",
                                "polyline": {
                                    "points": "xddjCrnrgGJGDGBA@CDGDIJS`@w@f@aAP]d@aAVk@p@{A|@oBFOFK?A@A@?@A@AFC"
                                },
                                "start_location": {
                                    "lat": -22.8002949,
                                    "lng": -43.3535386
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "0.7 km",
                                    "value": 683
                                },
                                "duration": {
                                    "text": "1 min",
                                    "value": 39
                                },
                                "end_location": {
                                    "lat": -22.8051539,
                                    "lng": -43.34498780000001
                                },
                                "html_instructions": "Merge onto <b>Rod. Pres. Dutra</b>",
                                "maneuver": "merge",
                                "polyline": {
                                    "points": "rodjC||qgGJUBKN]rCgGrBqEfA_CFQx@iBDKP_@DITi@HQ?A@EN]v@eBd@aAN[@E"
                                },
                                "start_location": {
                                    "lat": -22.8020169,
                                    "lng": -43.3507104
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "0.5 km",
                                    "value": 476
                                },
                                "duration": {
                                    "text": "1 min",
                                    "value": 36
                                },
                                "end_location": {
                                    "lat": -22.8062877,
                                    "lng": -43.3460656
                                },
                                "html_instructions": "Turn <b>right</b> onto the ramp to <b>L. Vermelha</b>/<wbr/><b>Aeroporto Internacional</b>",
                                "maneuver": "ramp-right",
                                "polyline": {
                                    "points": "dcejCdypgGVCf@y@j@aADAJQ@E@?LMJMBARI\\IVAHAXBNDLDNJPLJJFFDHDHFJBNDN@L@P?N?NCPCRENGNGNOVS`@QVGHURYTSL"
                                },
                                "start_location": {
                                    "lat": -22.8051539,
                                    "lng": -43.34498780000001
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "13.5 km",
                                    "value": 13491
                                },
                                "duration": {
                                    "text": "11 mins",
                                    "value": 650
                                },
                                "end_location": {
                                    "lat": -22.8435054,
                                    "lng": -43.2395872
                                },
                                "html_instructions": "Continue onto <b>Via Expressa Pres. João Goulart</b>/<wbr/><b>Linha Vermelha</b>",
                                "polyline": {
                                    "points": "hjejC|_qgGUFUFQBG?WBK?IAM?GASCQCQEECICKGKEeBaAIGoBiAGEOMECUWGEOOMOUWQWQYQ]KWEOEOCOGk@Cq@AWEaACi@Au@Aa@A}@CaACu@Cs@Aa@?e@KoECeBE_BKeFCmACqACuAAi@AkAIyDE{BKkFEsBCwAEeCGsCCeACw@Eu@Eg@CWG_@EWIe@EUG[W_AQm@Uo@g@kAWo@Sg@Q_@MYM]MYK_@GUIYESKk@G_@E_@CSCUC_@Ck@Ca@?c@?Y?]@WBo@@UF{@Bq@Bo@Ds@@i@?_A?a@Ac@A]Ee@AYEe@Gg@Gm@e@aEOoAOyAQuAIw@OuAOgAQ}AW}BWyBOsA_@uDg@}E[cDEYU}BGe@CMU}BAOE{@AICw@A_@AY@U@w@@_@Ba@Dg@@CRyAF]F[J_@Z_AXq@Vm@HU^w@Zo@`CgF`@w@\\w@v@}AfByDPa@Ra@JQRg@l@mAj@oA^w@p@mALYP_@?Ab@{@Re@Ri@Tk@Ni@Pm@Ji@Jm@DUHm@Hc@D_@Ho@Hk@Hk@RcAXgALe@FSPg@^}@JW^w@b@y@f@u@h@s@Za@p@s@h@o@^_@^]\\c@~BcC\\a@LOVc@R_@FMHMHSJSHUPm@Lg@HYDUDYDUDm@Dm@?U@W?uAC{@AcAEeCEoBCiAA]As@A_@Cm@?UAa@G_EAK?M?K?GAYGcCGqC?KCo@IqBAYCsA?GAq@CeBAi@EmAC}AAc@CiAEsBCeBCs@Cu@AaA?cA?u@@e@De@Dk@@OFe@BODUJm@Lg@FSLc@JUXw@P]P]Ta@P[dCkEl@eAXe@\\k@`@q@d@{@LS`@u@R[NWDGNWDEJOLSPSLQRWd@i@l@m@PQh@c@ZWtCgCv@s@n@o@JKTYPSV[^i@`@o@`@q@NYLUZq@`@aAZ{@ZcAVy@h@eBn@uBVw@ZeAPg@Pk@La@J]L]d@gAb@_AZk@NYZg@b@y@n@iA^m@v@sAh@cAfAiBP]Xi@Pa@FMPc@BKLa@Ne@TaAJ_@Jc@HUDOFML[BIFON[FIDKVa@DGHKFIJMHKRS\\]`@_@b@c@VUb@c@PSPSLOLMPWNWHOHOP]Ti@DMHSLe@Ng@T}@Rw@BOFSLg@La@Ne@Xu@JSJQJQXc@^i@b@c@LKVUXSJIJGPMPKRIZORIXKv@ULEJARE^G~@OjF{@~@OXEJCj@MRGVI\\MZKRKZQLG\\SXUNM`@]PQRSNSl@y@n@}@p@cAxAsBPUPURUHINO@ADGTQHGPMBCJGJGTOVOPGx@]FCd@SlDuAlHuCdDqA^OLGhEeBlAi@NGVKn@Yl@YpAq@bAq@^Yb@]r@q@PQPQn@q@TUBCZWZWZWf@]b@YXWTUDGX]`AwAV_@pAiBNOLOLMLKJKLITOZOXM^ORGRGRCXGNATCTAR?VAh@@V@`ABl@B"
                                },
                                "start_location": {
                                    "lat": -22.8062877,
                                    "lng": -43.3460656
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "5.7 km",
                                    "value": 5747
                                },
                                "duration": {
                                    "text": "6 mins",
                                    "value": 331
                                },
                                "end_location": {
                                    "lat": -22.8902391,
                                    "lng": -43.2234037
                                },
                                "html_instructions": "Keep <b>left</b> to stay on <b>Via Expressa Pres. João Goulart</b>/<wbr/><b>Linha Vermelha</b>",
                                "maneuver": "keep-left",
                                "polyline": {
                                    "points": "|rljClf|fGZ@hCJl@Dl@Fj@J^Ht@TXLJDLFJDJFFBd@V|Ax@^RHBHD\\LPFTHTH`@H\\Hh@FTDT@TBR@T?\\@N?P?TATARAVCTEPCf@KXG`@M|@UbA[PGlEqA`Bg@HCt@UNEv@Yl@Qb@Kf@Qv@Uf@Od@OTGn@SPEPG^M\\IZKRIRETGf@OPEf@KRETEf@Kb@IVGTCZE`@Gf@GXCd@Gb@Eh@Gd@G^Ed@Gb@GZCXELANAZGnAMt@IrAMlAS\\MJCFALCVI\\MPGTIPGTKPKHELIFEFCZQZSNKROTSd@c@PONOZa@\\c@Ze@DGFMLQ^q@Zk@Xe@R]PWLQPSJKNQNMFEDEFENKPKRMPIPIRKTGRGPGTGh@Mn@O`@KhB]VE`@G^Ej@GhAGvJk@nF_@|AKd@EDA~DU@?B?VCF?B?JAj@AV?l@?Z?|@Bh@@jBFp@@L?T@@?J@hAB`CF`CD`A?j@Ap@Cb@E`AIrAQd@KPCZI`@KZIl@OZKf@OTKJE@Ah@U^QBA@AVODCXMRMbB}@vAw@l@]ZSZSl@_@h@c@h@e@h@g@j@q@RQRUZ[PUXW^]^[d@_@DEz@k@HEPMXWhBqA`BqAdBoAjCqBhDcCn@i@fA{@RObCiBpEiD"
                                },
                                "start_location": {
                                    "lat": -22.8435054,
                                    "lng": -43.2395872
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "0.8 km",
                                    "value": 840
                                },
                                "duration": {
                                    "text": "1 min",
                                    "value": 54
                                },
                                "end_location": {
                                    "lat": -22.8916956,
                                    "lng": -43.2167447
                                },
                                "html_instructions": "Take the exit on the <b>left</b> toward <b>Centro</b>/<wbr/><b>Copacabana</b>",
                                "maneuver": "ramp-left",
                                "polyline": {
                                    "points": "~vujCfayfGDIR_@BIDK@GBI@K?G?I?ICSCOEYMg@Mg@GWCMUeAWeAe@mBAIAI?CAEACMc@IWKYGQGQCMCMCK?IAI?K?EAK@K?O@MFo@Ba@BOD]DQBMDKDUBEBGBGFGHM@CFI^]TS@ADCHEn@[`@Q^SDAFC@?BADABALEr@[`@WHGn@a@"
                                },
                                "start_location": {
                                    "lat": -22.8902391,
                                    "lng": -43.2234037
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "1.0 km",
                                    "value": 950
                                },
                                "duration": {
                                    "text": "1 min",
                                    "value": 56
                                },
                                "end_location": {
                                    "lat": -22.8984397,
                                    "lng": -43.2114296
                                },
                                "html_instructions": "Merge onto <b>Viaduto do Gasômetro</b>",
                                "maneuver": "merge",
                                "polyline": {
                                    "points": "b`vjCrwwfGTIl@]xGcCZMx@[vCeAFEFCr@Un@U\\MVKTKVOXONMDEPONOTWJONUPWR[PYXi@HMXg@NW|@qAFGj@w@t@}@RWhAyANS"
                                },
                                "start_location": {
                                    "lat": -22.8916956,
                                    "lng": -43.2167447
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "1.9 km",
                                    "value": 1877
                                },
                                "duration": {
                                    "text": "2 mins",
                                    "value": 118
                                },
                                "end_location": {
                                    "lat": -22.8928381,
                                    "lng": -43.1945947
                                },
                                "html_instructions": "Exit on the <b>left</b> onto <b>Av. Rodrigues Alves</b>",
                                "maneuver": "ramp-left",
                                "polyline": {
                                    "points": "fjwjClvvfGH[Xg@BGNe@F_@BY?E?a@?OCOAMES?AACGUAGA?AEAECGGM?AISEKA?CIACIO[w@Sk@[gAWcAEOe@{ACKCEEEIGyAyE[cAUs@Sq@EOeAiDg@aBUs@K]IWSo@IY_CwHu@_C_@oAy@oCWy@EOWu@K][aAIUW}@K[Qi@Ka@GUMc@Mc@Oi@Uu@_@kAOk@EOEMCOESEWEYAQ?G?I?OAK?A?I@]?]DuA"
                                },
                                "start_location": {
                                    "lat": -22.8984397,
                                    "lng": -43.2114296
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "2.7 km",
                                    "value": 2680
                                },
                                "duration": {
                                    "text": "3 mins",
                                    "value": 188
                                },
                                "end_location": {
                                    "lat": -22.9039674,
                                    "lng": -43.1724903
                                },
                                "html_instructions": "Continue onto <b>Túnel Pref. Marcello Alencar</b>",
                                "polyline": {
                                    "points": "fgvjCdmsfGJmE@IBoABc@FgAHk@Fe@Fi@ZoBDQ^wAh@_B`AgCNa@Pa@rAmDfAqCZ{@`A}B~@}BzB}FfAuCp@sBHWz@_Dh@eCv@iDJa@@E\\_BTuDF_AJyABw@F}@De@D_@HWL_@V_@XYVY`@s@FIn@y@HIfAcAp@o@BAv@q@XYd@_@ZYPOZWv@q@TS`@[bCmBr@e@PM\\U`@Y|AiATQz@u@h@o@HI"
                                },
                                "start_location": {
                                    "lat": -22.8928381,
                                    "lng": -43.1945947
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "0.5 km",
                                    "value": 516
                                },
                                "duration": {
                                    "text": "1 min",
                                    "value": 33
                                },
                                "end_location": {
                                    "lat": -22.9063836,
                                    "lng": -43.1685612
                                },
                                "html_instructions": "Continue onto <b>Av. Alfred Agache</b>",
                                "polyline": {
                                    "points": "xlxjC`cofGPYHMP[LWL[JY\\iA@EBMt@oCDMDO`@aB@EBKJ]ZiAX_AJUPSNMJG\\OJAJAjAC"
                                },
                                "start_location": {
                                    "lat": -22.9039674,
                                    "lng": -43.1724903
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "0.5 km",
                                    "value": 465
                                },
                                "duration": {
                                    "text": "1 min",
                                    "value": 30
                                },
                                "end_location": {
                                    "lat": -22.9105513,
                                    "lng": -43.1684277
                                },
                                "html_instructions": "Continue onto <b>Av. Gen. Justo</b>",
                                "polyline": {
                                    "points": "z{xjCnjnfGfBC~@CfCKXA`ACnBGvAET?NAl@AL?B?`@?X?T@L@HBLBND"
                                },
                                "start_location": {
                                    "lat": -22.9063836,
                                    "lng": -43.1685612
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "81 m",
                                    "value": 81
                                },
                                "duration": {
                                    "text": "1 min",
                                    "value": 10
                                },
                                "end_location": {
                                    "lat": -22.9103609,
                                    "lng": -43.1690497
                                },
                                "html_instructions": "Take the exit toward <b>Castelo</b>/<wbr/><b>Av. Pres. Vargas</b>/<wbr/><b>Lapa</b>/<wbr/><b>T. Menezes Côrtes</b>",
                                "maneuver": "ramp-right",
                                "polyline": {
                                    "points": "|uyjCtinfGHNBF@F@HAL?JAFCHEFCDGDEBEDQF"
                                },
                                "start_location": {
                                    "lat": -22.9105513,
                                    "lng": -43.1684277
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "0.1 km",
                                    "value": 119
                                },
                                "duration": {
                                    "text": "1 min",
                                    "value": 19
                                },
                                "end_location": {
                                    "lat": -22.9093517,
                                    "lng": -43.1694412
                                },
                                "html_instructions": "Merge onto <b>Av. Mal. Câmara</b>",
                                "maneuver": "merge",
                                "polyline": {
                                    "points": "vtyjCpmnfG[JA?u@TuBj@"
                                },
                                "start_location": {
                                    "lat": -22.9103609,
                                    "lng": -43.1690497
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "0.2 km",
                                    "value": 197
                                },
                                "duration": {
                                    "text": "1 min",
                                    "value": 33
                                },
                                "end_location": {
                                    "lat": -22.9097217,
                                    "lng": -43.1711469
                                },
                                "html_instructions": "Turn <b>left</b> onto <b>Av. Franklin Roosevelt</b>",
                                "maneuver": "turn-left",
                                "polyline": {
                                    "points": "lnyjC~onfG]JNn@Nt@fAbF"
                                },
                                "start_location": {
                                    "lat": -22.9093517,
                                    "lng": -43.1694412
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "73 m",
                                    "value": 73
                                },
                                "duration": {
                                    "text": "1 min",
                                    "value": 19
                                },
                                "end_location": {
                                    "lat": -22.9099159,
                                    "lng": -43.1718288
                                },
                                "html_instructions": "Keep <b>right</b> to stay on <b>Av. Franklin Roosevelt</b>",
                                "maneuver": "keep-right",
                                "polyline": {
                                    "points": "vpyjCtznfGPv@TnA"
                                },
                                "start_location": {
                                    "lat": -22.9097217,
                                    "lng": -43.1711469
                                },
                                "travel_mode": "DRIVING"
                            },
                            {
                                "distance": {
                                    "text": "0.4 km",
                                    "value": 359
                                },
                                "duration": {
                                    "text": "1 min",
                                    "value": 70
                                },
                                "end_location": {
                                    "lat": -22.9068576,
                                    "lng": -43.1729362
                                },
                                "html_instructions": "Turn <b>right</b> at the 1st cross street onto <b>Av. Pres. Antônio Carlos</b>",
                                "maneuver": "turn-right",
                                "polyline": {
                                    "points": "~qyjC|~nfG]Ja@J[H_@Hc@JWHaBb@_@JIBG@QFmAZE@e@LODc@Jk@Nk@N"
                                },
                                "start_location": {
                                    "lat": -22.9099159,
                                    "lng": -43.1718288
                                },
                                "travel_mode": "DRIVING"
                            }
                        ],
                        "traffic_speed_entry": [],
                        "via_waypoint": []
                    }
                ],
                "overview_polyline": {
                    "points": "pvwnCfht{GsTsOeSdJau@w\\_`C_^`U{vCjd@kw@nAok@_`@cnCiDak@ca@sS{t@uDiMoi@caA}{A}HyoAou@aqAypA_jA~B{uAbj@amAiHeyCccAqzAxIoeDe[m_C`Mg{BwI_cAqk@c{@a{@}fAwZs_B_Qa}C_Jir@lR{cA}_Ao|E}fA_kDi_AkvBcxBytB}fBmlDweAcqA}i@wuAlOqnAqHkzEwhAinC_Q}p@dLksAYaaCtAobAeKgcAgRciDw`AymDavA}zBe~Am{AiHebA{gA_mAyt@ceA{Gy~@_aAytC{Ro}@gt@oeAacC{jBw}AuoCacAohBqbBwh@auAufAu_AoiB{kAsy@ix@aaBox@uzBkbB}p@giAg_A{i@ykAmcAatBoyB~]wdA`GueAgpB}~@_eFuhAi|B{jBmuCcuBqdFezFmrN{yFcrNa}DocHoe@}yA}WigBs~BirBuhA}Wo{@_pAaj@cu@sIuvAgg@kt@{tAs|@kjBmvB_uGubK_gLufQc`AucCaReaAgh@}_@g}@}lAsdAi{B{l@oaBu}@mbAopBokAgl@gVyVq^sd@yOcVi{@uw@Tgm@ciAhEilB~Mye@mVe}@a`AeeBu[yb@hPckAmr@keBsj@i_Dyg@iaDceAewCwf@yjBkx@ybBiT}\\fRkw@zv@iuDt@weCmTw~@i_AesCk{@oyCaqAyzCso@guFrD{kD{_@m}G}g@{rOxZexAzAs`@tb@aW|`A_hAp]eoAhfAkvAlXsq@ph@cq@ry@uwAri@igAleA}aAhgBwq@zVog@pb@aNnVqw@zc@_GpHaV_@}cAw@yhAcb@}vApJwf@ja@_Qda@eNxSa\\xxAkt@jNcf@_D}fBhXes@w\\g|Aid@_nDcFsw@~Ykc@qQs`Cm]wiAb_@ieAzO}yAnt@{Tpd@kn@Dso@fq@ug@dr@kJ~}@uiBviAo~AvjCmgAvYi]Zso@lIow@~HsyAgEm}@|GoTlI}NjO}DuY_e@lFwFtPdGfTp\\lUbTr@|EmJcg@~VmUnAuT}`@yk@h~@kh@fLykBdWs_ADmcA`f@yo@f]s`Cr|@yaAbf@aqGxv@kiJbOiqA_ConAuI{pDdCaxAv_@aw@rw@eoG{b@}`B`Ck`DdM_{Abn@_fAtqBe~DrvAyeC|pBg}Epj@kaA{DlLoPaTeMayBmKamAfUqu@tb@iwA`OwbBvt@iuArm@wk@nnAqv@jZuNd^xHpjAkVlaAi^vlA}Vhg@ug@kCqU`v@kj@k\\qsAx]s_C|dAww@KpP{PdJ"
                },
                "summary": "BR-116",
                "warnings": [],
                "waypoint_order": []
            }
        ],
        "request": {
            "origin": {
                "place_id": "place_id:ChIJ0WGkg4FEzpQRrlsz_whLqZs",
                "location": {
                    "lat": -23.5557715,
                    "lng": -46.6395569
                }
            },
            "destination": {
                "place_id": "place_id:ChIJW6AIkVXemwARTtIvZ2xC3FA",
                "location": {
                    "lat": -22.9068576,
                    "lng": -43.1729362
                }
            },
            "mode": "driving"
        }
    },
    "source": {
        "name": "São Paulo, State of São Paulo, Brazil",
        "location": {
            "lat": -23.5557715,
            "lng": -46.6395569
        }
    },
    "destination": {
        "name": "Rio de Janeiro, State of Rio de Janeiro, Brazil",
        "location": {
            "lat": -22.9068576,
            "lng": -43.1729362
        }
    }
}
 * @returns 
 */
export function RouteCard({ route, isSelected, onClick, compact }: RouteCardProps) {
  if (!route) return null;
  // const origin1 = route.source.location;
  // const origin2 = route.source.name;
  // const destination1 = route.destination.location;
  // const destination2 = route.destination.name;
  // const googleService = new MapsService();
  
  // const progressPercent = useMemo(() =>{ 
  //   (async () => {
  //     const progress = await googleService.getRouteProgress({ o1: origin1, o2: origin2 }, { d1: destination1, d2: destination2 }, {});
  //     console.debug(progress);
  //     // receive in seconds
  //     const duration = progress.duration.value;
  //     return (progress.duration.value / duration) * 100;
  //   })();
  // }, [origin1, origin2, destination1, destination2]);
  const handleClick = () => {
    if (isSelected) {
      onClick?.(null);
    } else {
      onClick?.(route);
    }
  };

  if (compact) {
    return (
      <Card
        className={cn(
          "transition-all cursor-pointer hover:shadow-md pointer-events-auto",
          isSelected && "ring-2 ring-primary",
          "max-w-[300px]"
        )}
        onClick={handleClick}
      >
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Icons.truck className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-sm">{route.name}</span>
            </div>
            <Badge
              variant="outline"
              className={cn(
                "text-xs",
                // `bg-${route.status.color}-500/10 text-${route.status.color}-500`
              )}
            >
              {route.status.label}
            </Badge>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">

            <div className="text-xs text-muted-foreground truncate">
              {route.source.name}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-muted rounded-full">
                <div
                  className="h-full bg-primary rounded-full"
                  // style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
              {/* <span className="text-xs font-medium">{Math.round(progressPercent)}%</span> */}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "transition-all cursor-pointer hover:shadow-md pointer-events-auto max-w-[300px]",
        isSelected && "ring-2 ring-primary"
      )}
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icons.truck className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">{route.name}</span>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "bg-opacity-10",
              // `bg-${route.status.color}-500 text-${route.status.color}-500`
            )}
          >
            {/* {route.status.label} */}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="text-sm">
              <div className="text-muted-foreground">Motorista</div>
              <div>{route.source.name}</div>
          </div>

          <div className="text-sm">
            <div className="text-muted-foreground">Cliente</div>
            <div>{route.destination.name}</div>
          </div>
          </div>

          <div className="text-sm">
            <div className="text-muted-foreground">Progresso</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-muted rounded-full">
                <div
                  className="h-full bg-primary rounded-full"
                  // style={{ width: `${progressPercent}%` }}
                />
              </div>
              {/* <span className="text-xs">{Math.round(progressPercent)}%</span> */}
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <div>
              <div className="text-muted-foreground">Saída</div>
              {/* <div>{format(route.created_at, "HH:mm")}</div> */}
            </div>
            <div className="text-right">
              <div className="text-muted-foreground">Chegada Prevista</div>
              {/* <div>{format(Math.round(route.duration), "HH:mm")}</div> */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 