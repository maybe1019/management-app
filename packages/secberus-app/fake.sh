#!/bin/bash
#A variable
VAR="VAR inside the script"
# print INFO message to stdout
# Argument: 
#    $1: INFO message to print
log_info() {
    local MSG="$1"
    printf "%s - [INFO] %s\n" "$(date)" "$MSG"
}

# print ERROR message to stderr
# Argument: 
#    $1: ERROR message to print
log_error() {
    local MSG="$1"
    printf "%s - [ERROR] %s\n" "$(date)" "$MSG" >&2
}

faketty () {
    # Create a temporary file for storing the status code
    tmp=$(mktemp)

    # Ensure it worked or fail with status 99
    [ "$tmp" ] || return 99

    # Produce a script that runs the command provided to faketty as
    # arguments and stores the status code in the temporary file
    cmd="$(printf '%q ' "$@")"'; echo $? > '$tmp

    # Run the script through /bin/sh with fake tty
    if [ "$(uname)" = "Darwin" ]; then
    # MacOS
    script -Fq /dev/null /bin/sh -c "$cmd"
    else
    script -qfc "/bin/sh -c $(printf "%q " "$cmd")" /dev/null
    fi

    # Ensure that the status code was written to the temporary file or
    # fail with status 99
    [ -s $tmp ] || return 99

    # Collect the status code from the temporary file
    err=$(cat $tmp)

    # Remove the temporary file
    rm -f $tmp

    # Return the status code
    return $err
}

case "$1" in
    "") ;;
    log_info) "$@"; exit;;
    faketty) "$@"; exit;;
    *) log_error "Unkown function: $1()"; exit 2;;
esac
    