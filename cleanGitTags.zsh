function deleteTags() {
    local flag_help
    local dry_run
    local arg_crf=(30)
    local usage=(
        "deleteTags [-h|--help]"
        "deleteTags [-d|--dry]"
    )

    zmodload zsh/zutil

    zparseopts -D -F -K -- \
        {h,-help}=flag_help \
        {d,-dry}=dry_run ||
        return 1

    [[ -z "$flag_help" ]] || { print -l $usage && return }
    [[ -z "$1" ]] && { print -l $usage && return }

    match=$1
    tags=$(git tag -l | grep -E "@${match}-*")
    set -A tags ${=tags}

    [[ -z "$dry_run" ]] || { print -l "dry run... \n$tags" && return }

    if [[ $tags ]]; then
        echo "Offending tags found:"
        echo $tags

        echo "Removing locally..."
        git tag --delete $tags

        echo "Making sure remote is clean..."
        for item in $tags
        do
            echo "Attempting removing $item from remote"
            git push origin :refs/tags/$item 2>/dev/null
        done
    fi
}
