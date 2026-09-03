import { useQuery } from "@tanstack/react-query";

const baseUrl = `https://raw.githubusercontent.com/salemango/salemango.github.io/refs/heads/main/ctb-data/`

async function fetchTraits(group) {
    try {
        const response = await fetch(`${baseUrl}${group}-traits.json`);
        if (!response.ok) {
            throw new Error(`Failed to load ${group}: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error(error.message);
    }
}

export function usePositiveTraits() {
    return useQuery({queryKey: ["traits, positive"], queryFn: () => fetchTraits("positive")});
}

export function useNeutralTraits() {
    return useQuery({queryKey: ["traits, neutral"], queryFn: () => fetchTraits("neutral")});
}

export function useNegativeTraits() {
    return useQuery({queryKey: ["traits, negative"], queryFn: () => fetchTraits("negative")});
}