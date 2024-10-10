//% color="#16626B" icon="\uf031"
namespace Fonts {
    
    let ligs: string[] = []
    let ligages: Image[] = []
    let ligwidth: number[] = []
    let letterspace: number = 1

    export function drawTransparentImage(src: Image, to: Image, x: number, y: number) {
        if (!src || !to) {
            return;
        }
        to.drawTransparentImage(src, x, y);
    }

    //%block="set $glyph to $image=screen_image_picker and staying $notmove"
    export function SetCharecter(glyph: string, image: Image, notmove: boolean){
        if (ligs.indexOf(glyph) == -1) {
            ligs.push(glyph)
            ligages.push(image)
            if (notmove) {
                ligwidth.push(0)
            } else {
                ligwidth.push(image.width)
            }
        } else {
            ligages[ligs.indexOf(glyph)] = image
            if (notmove) {
                ligwidth[ligs.indexOf(glyph)] = 0
            } else {
                ligwidth[ligs.indexOf(glyph)] = image.width
            }
            
        }
    }

    //%block="number of glyphs"
    export function NumOfGlyphs(): number {
        return ligs.length
    }

    //%block="array of glyph images"
    export function ImageArray(): Image[] {
        return ligages
    }

    //%block="array of glyphs"
    export function GlyphArray(): String[] {
        return ligs
    }

    //%block="create the image of $input"
    export function SetImage(input: string) {
        let heig = 0
        let widt = 0
        let curwidt = 0
        let uwidt = 0
        let swidt = 0
        let nwidt = 0
        let lwidt: number[] = []

        for (let currentletter = 0; currentletter < input.length; currentletter++) {

            if (!(ligs.indexOf(input.charAt(currentletter)) == -1)) {
                heig = Math.max(heig, ligages[(ligs.indexOf(input.charAt(currentletter)))].height)
            }
        }

        for (let currentletter2 = 0; currentletter2 < input.length; currentletter2++) {
            if (!(ligs.indexOf(input.charAt(currentletter2)) == -1)) {
                uwidt = ligages[(ligs.indexOf(input.charAt(currentletter2)))].width
                
                lwidt.push(uwidt)
                if (ligwidth[(ligs.indexOf(input.charAt(currentletter2) + 1))] == 0) {
                    swidt = uwidt
                } else {
                    swidt = 0
                }
                widt += Math.abs(uwidt - swidt)
            } else if (input.charAt(currentletter2) == " ") {
                widt += 3*letterspace
            }
            widt += 1
        }

        let output = image.create(widt, heig)
        for (let currentletter3 = 0; currentletter3 < input.length; currentletter3++) {

            if (!(ligs.indexOf(input.charAt(currentletter3)) == -1)) {
                uwidt = ligwidth[(ligs.indexOf(input.charAt(currentletter3)))]
                
                if (ligwidth[(ligs.indexOf(input.charAt(currentletter3)))] == 0) {
                    nwidt = ligages[(ligs.indexOf(input.charAt(currentletter3)))].width
                } else {
                    nwidt = 0
                }
                drawTransparentImage(ligages[(ligs.indexOf(input.charAt(currentletter3)))], output, curwidt - (nwidt - (Math.abs(nwidt - (nwidt - swidt)))), 0 + (heig - ligages[(ligs.indexOf(input.charAt(currentletter3)))].height))
                if (ligwidth[(ligs.indexOf(input.charAt(currentletter3 + 1)))] == 0) {
                    swidt = nwidt
                } else {
                    swidt = 0
                }
                if (nwidt == 0) and (ligwidth[(ligs.indexOf(input.charAt(currentletter3 + 1)))] > 0) {
                    curwidt += letterspace
                }
                curwidt += Math.abs(uwidt - swidt)
            } else if (input.charAt(currentletter3) == " ") {
                curwidt += 3*letterspace
            }
        }
        return output

    }
    
    //%block="set letter spacing to $input"
    export function SetSpace(input: number) {
       letterspace = input
    }

    //%block="change letter spacing by $input"
    export function ChangeSpace(input: number) {
        letterspace += input
    }
    
    
}

    