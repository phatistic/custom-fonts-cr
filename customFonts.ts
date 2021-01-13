//% color="#16626B" icon="\uf031"
namespace Fonts {
    
    let ligs: string[] = []
    let ligages: Image[] = []
    let letterspace: number = 1

    export function drawTransparentImage(src: Image, to: Image, x: number, y: number) {
        if (!src || !to) {
            return;
        }
        to.drawTransparentImage(src, x, y);
    }

    //%block="set $glyph to $image=screen_image_picker"
    export function SetCharecter(glyph: string, image: Image){
        if (ligs.indexOf(glyph) == -1) {
            ligs.push(glyph)
            ligages.push(image)
        } else {
            ligages[ligs.indexOf(glyph)] = image
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

        for (let currentletter = 0; currentletter < input.length; currentletter++) {

            if (!(ligs.indexOf(input.charAt(currentletter)) == -1)) {
                heig = Math.max(heig, ligages[(ligs.indexOf(input.charAt(currentletter)))].height)
            }
        }

        for (let currentletter2 = 0; currentletter2 < input.length; currentletter2++) {
            if (!(ligs.indexOf(input.charAt(currentletter2)) == -1)) {
                widt += ligages[(ligs.indexOf(input.charAt(currentletter2)))].width
            } else if (input.charAt(currentletter2) == " ") {
                widt += 3*letterspace
            }
            widt += 1
        }

        let output = image.create(widt, heig)
        for (let currentletter3 = 0; currentletter3 < input.length; currentletter3++) {

            if (!(ligs.indexOf(input.charAt(currentletter3)) == -1)) {
                drawTransparentImage(ligages[(ligs.indexOf(input.charAt(currentletter3)))], output, curwidt, 0+(heig-ligages[(ligs.indexOf(input.charAt(currentletter3)))].height))
                curwidt += letterspace
                curwidt += ligages[(ligs.indexOf(input.charAt(currentletter3)))].width
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

    