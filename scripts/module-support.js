export class ModuleSupport {

	static async diceSoNiceRollStart(_messageId, context) {
        // Add 1 to penetration dice so dsn shows actual die throws.
        const normalize = (roll, r=20) => {
            if (r < 0) {
                return;
            }

            for (let i = 0; i < roll.terms.length; i++) {
                // PoolTerms contain sets of terms we need to evaluate.
                if (roll.terms[i]?.rolls) {
                    for (let j = 0; j < roll.terms[i].rolls.length; j++) {
                        normalize(roll.terms[i].rolls[j], --r);
                    }
                }

                let penetrated = false;
                for (let j = 0; j < roll.terms[i]?.results?.length; j++) {
                    const result = roll.terms[i].results[j];
                    if (penetrated && j) result.result++;
                    penetrated = result.penetrated;
                }
            }
        };
        normalize(context.roll);
    }
}