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

    //%block="set $glyph to $imgi=screen_image_picker and staying $notmove and erasecol $bcol and spacebar $scol"
    export function SetCharecter(glyph: string, imgi: Image, notmove: boolean, bcol: number, scol: number){
        let scnwidt = true
        let scwidt = false
        let wi = 0
        let wj = 0
        let si = 0
        let imgj = image.create(1, 1)
        if (bcol > 0 && bcol < 16){
            imgi.replace(bcol, 0)
        }
        for (let xw = 0 ; xw < imgi.width ; xw++){
            si = 0
            for (let yh = 0 ; yh < imgi.height ; yh++){
                if (scnwidt && ( imgi.getPixel(xw, yh) != 0 || (scwidt && imgi.getPixel( xw + 1 , yh) != 0 ))) {
                    si += 1
                }

            }
            if (scnwidt) {
                if (scwidt) {
                    if (si <= 0){
                        wj = xw
                        scnwidt = false
                    }

                } else {
                    if (si > 0) {
                        wi = xw
                        scwidt = true
                    }

                }
            }
        }
        imgj = image.create(Math.abs(wj - wi), imgi.height)
        drawTransparentImage(imgi, imgj, 0 - wi, 0)
        if (scol > 0 && scol < 16){
            imgj.replace(scol, 0)
        }
        if (ligs.indexOf(glyph) == -1) {
            ligs.push(glyph)
            ligages.push(imgj)
            if (notmove) {
                ligwidth.push(0)
            } else {
                ligwidth.push(imgj.width)
            }
        } else {
            ligages[ligs.indexOf(glyph)] = imgj
            if (notmove) {
                ligwidth[ligs.indexOf(glyph)] = 0
            } else {
                ligwidth[ligs.indexOf(glyph)] = imgj.width
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

    //%block="create the image of $input in $pwidt"
    export function SetImage(input: string, pwidt: number) {
        let heig = 0
        let widt = 0
        let curwidt = 0
        let uwidt = 0
        let swidt = 0
        let nwidt = 0
        let lwidt: number[] = []
        let nci = 0
        let nchi = 0
        let currentletter = 0
        while (currentletter < input.length) {
            
            if (!(ligs.indexOf(input.charAt(currentletter)) == -1)) {
                heig = Math.max(heig, ligages[(ligs.indexOf(input.charAt(currentletter)))].height)
                nci += ligwidth[(ligs.indexOf(input.charAt(currentletter)))]
            
                if (pwidt > 0) {
                    if (nci > pwidt) {
                        heig += ligages[(ligs.indexOf(input.charAt(currentletter)))].height
                        nci = 0
                    } else if (input.charAt(currentletter) == " "){
                        if (currentletter + 1 < input.len && input.charAt(currentletter + 1) == "\\") {
                            if (currentletter + 2 < input.len && input.charAt(currentletter + 2) == "n") {
                                if (currentletter + 3 < input.len && input.charAt(currentletter + 3) == " ") {
                                    heig += ligages[(ligs.indexOf(input.charAt(currentletter)))].height
                                    currentletter += 3
                                    nci = 0
                                }
                            }
                        }
                    }
                }
            }
            currentletter += 1
        }
        let currentletter2 = 0
        let nci = 0
        while (currentletter2 < input.length) {
            if (!(ligs.indexOf(input.charAt(currentletter2)) == -1)) {
                uwidt = ligwidth[(ligs.indexOf(input.charAt(currentletter2)))]
                nwidt = ligages[(ligs.indexOf(input.charAt(currentletter2)))].width
                lwidt.push(uwidt)
                if (ligwidth[(ligs.indexOf(input.charAt(currentletter2) + 1))] == 0) {
                    swidt = uwidt
                } else {
                    swidt = 0
                }
                if (uwidt > 0) {
                    nci += Math.abs(uwidt - swidt)
                }
                if (ligwidth[(ligs.indexOf(input.charAt(currentletter2) + 1))] > 0) {
                    nci += letterspace
                }
            } else if (input.charAt(currentletter2) == " ") {
                nci += 3*letterspace
            }
            if (pwidt > 0) {
                if (nci > pwidt) {
                    nci = 0
                } else if (input.charAt(currentletter2) == " ") {
                    if (currentletter2 + 1 < input.len && input.charAt(currentletter2 + 1) == "\\" {
                        if (currentletter2 + 2 < input.len && input.charAt(currentletter2 + 2) == "n") {
                            if (input.charAt(currentletter2 + 3) == " ") {
                                nci = 0
                                currentletter2 += 3
                            }
                        }
                    }
                }
            }
            
            widt = Math.max(widt, nc)
            currentletter2 += 1
        }
        let output = image.create(widt, heig)
        let currentletter3 = 0
        let nci = 0
        let nchi = 0
        while (currentletter3 < input.length) {
            if (!(ligs.indexOf(input.charAt(currentletter3)) == -1)) {
                uwidt = ligwidth[(ligs.indexOf(input.charAt(currentletter3)))]
                if (ligwidth[(ligs.indexOf(input.charAt(currentletter3)))] == 0) {
                    nwidt = ligages[(ligs.indexOf(input.charAt(currentletter3)))].width
                } else {
                    nwidt = 0
                }
                drawTransparentImage(ligages[(ligs.indexOf(input.charAt(currentletter3)))], output, curwidt - nwidt, nchi + (heig - ligages[(ligs.indexOf(input.charAt(currentletter3)))].height))
                if (ligwidth[(ligs.indexOf(input.charAt(currentletter3 + 1)))] == 0) {
                    swidt = nwidt
                } else {
                    swidt = 0
                }
                if ( ligwidth[(ligs.indexOf(input.charAt(currentletter3 + 1)))] > 0){
                    nci += letterspace
                }
                if ( ligwidth[(ligs.indexOf(input.charAt(currentletter3)))] > 0 ){
                    nci += Math.abs(uwidt - nwidt)
                }
            } else if (input.charAt(currentletter3) == " ") {
                nci += 3*letterspace
            }
            if (pwidt > 0) {
                if (nci > pwidt) {
                    nchi += ligages[(ligs.indexOf(input.charAt(currentletter)))].height
                    nci = 0
                } else if (input.charAt(currentletter3) == " "){
                    if (currentletter + 1 < input.len && input.charAt(currentletter3 + 1) == "\\") {
                        if (currentletter + 2 < input.len && input.charAt(currentletter3 + 2) == "n") {
                            if (currentletter + 3 < input.len && input.charAt(currentletter3 + 3) == " ") {
                                nchi += ligages[(ligs.indexOf(input.charAt(currentletter3)))].height
                                currentletter3 += 3
                                nci = 0
                            }
                        }
                    }
                }
            }
            
            if (curwidt != nc) {
                curwidt = nc
            }
            currentletter3 += 1
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

    
