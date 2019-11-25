import {
    query,
    AnimationMetadata,
    AnimationQueryOptions,
    AnimationQueryMetadata
} from '@angular/animations';

export function debugAnimation(e) {
    console.group(`${e.phaseName} ${e.triggerName}`);
    console.log('From:', e.fromState);
    console.log('To:', e.toState);
    console.log('Total Time:', e.totalTime);
    console.groupEnd();
}

export function queryOn(
    selector: string,
    animation: AnimationMetadata | AnimationMetadata[],
    options?: AnimationQueryOptions
): AnimationQueryMetadata {
    return query(selector, animation, {
        optional: true,
        ...options
    });
}
